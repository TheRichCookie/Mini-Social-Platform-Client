import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
// import {JwtHelperService} from '@auth0/angular-jwt';
import type {UkUserInfo, UkUserPrivate} from '@utils/ui-kit/definitions';
import {UkStoringProperty} from '@utils/ui-kit/definitions';
import type {Observable} from 'rxjs';
import {BehaviorSubject, of} from 'rxjs';

import {UkBrowserStorageService} from '../browser-storage/browser-storage.service';
import {UkLoggerPart, UkLoggerService} from '../public-api';

// const jwtHelperService = new JwtHelperService();

export interface UkTokesInfo {
  accessToken: string | null;
  refreshToken: string | null;
  accessExpireTime: number | string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UkAuthenticateService {
  private readonly onAccessTokenChangeSubject$ = new BehaviorSubject<string>(
    null!,
  );

  private readonly onAccessTokenExpirationChangeSubject$ =
    new BehaviorSubject<string>(null!);

  private readonly onRefreshTokenChangeSubject$ = new BehaviorSubject<string>(
    null!,
  );

  private readonly onRefreshTokenExpirationChangeSubject$ =
    new BehaviorSubject<string>(null!);

  private readonly onUserInfoChangeSubject$ = new BehaviorSubject<UkUserInfo>(
    null!,
  );

  private readonly onUserInfoPrivateChangeSubject$ =
    new BehaviorSubject<UkUserPrivate>(null!);

  private readonly onResetUserInfoSubject$ = new BehaviorSubject<boolean>(
    null!,
  );

  private readonly onLogOutSubject$ = new BehaviorSubject<boolean | null>(null);

  public readonly loggerService = inject(UkLoggerService);
  public readonly browserStorageService = inject(UkBrowserStorageService);
  public readonly router = inject(Router);
  public readonly store = inject(Store);
  public readonly httpClient = inject(HttpClient);

  public onAccessTokenChange$: Observable<string> =
    this.onAccessTokenChangeSubject$.asObservable();

  public onRefreshTokenChange$: Observable<string> =
    this.onRefreshTokenChangeSubject$.asObservable();

  public onAccessTokenExpirationChange$: Observable<string> =
    this.onAccessTokenExpirationChangeSubject$.asObservable();

  public onRefreshTokenExpirationChange$: Observable<string> =
    this.onRefreshTokenExpirationChangeSubject$.asObservable();

  public onUserInfoChange$: Observable<UkUserInfo> =
    this.onUserInfoChangeSubject$.asObservable();

  public onUserInfoPrivateChange$: Observable<UkUserPrivate> =
    this.onUserInfoPrivateChangeSubject$.asObservable();

  public onResetUserInfoChange$: Observable<boolean> =
    this.onResetUserInfoSubject$.asObservable();

  public onLogOutChangeStatus$: Observable<boolean | null> =
    this.onLogOutSubject$.asObservable();

  public accessToken: string | null = '';
  public refreshToken: string | null = '';
  public accessTokenExpiration: number | string | null = 0;
  public refreshTokenExpiration: number | string | null = 0;
  public userInfo: UkUserInfo | null = null;

  constructor() {
    this.userInfo = this.browserStorageService.get(
      UkStoringProperty.USER_INFO,
    ) as UkUserInfo;
    this.accessToken = this.browserStorageService.get(
      UkStoringProperty.ACCESS_TOKEN,
    );
    this.refreshToken = this.browserStorageService.get(
      UkStoringProperty.REFRESH_TOKEN,
    );
    this.accessTokenExpiration = this.browserStorageService.get(
      UkStoringProperty.ACCESS_TOKEN_EXPIRATION,
    );
    this.refreshTokenExpiration = this.browserStorageService.get(
      UkStoringProperty.REFRESH_TOKEN_EXPIRATION,
    );

    if (!this.accessToken) {
      this.clearAll();
    } else {
      const ACCESS_TOKEN = JSON.parse(JSON.stringify(this.accessToken));
      const ACCESS_TOKEN_EXPIRATION = JSON.parse(
        JSON.stringify(this.accessTokenExpiration),
      );
      const REFRESH_TOKEN = JSON.parse(JSON.stringify(this.refreshToken));
      const REFRESH_TOKEN_EXPIRATION = JSON.parse(
        JSON.stringify(this.refreshTokenExpiration),
      );
      const USER_INFO = JSON.parse(JSON.stringify(this.userInfo));

      this.onAccessTokenChangeSubject$.next(ACCESS_TOKEN);
      this.onAccessTokenExpirationChangeSubject$.next(ACCESS_TOKEN_EXPIRATION);
      this.onRefreshTokenChangeSubject$.next(REFRESH_TOKEN);
      this.onRefreshTokenExpirationChangeSubject$.next(
        REFRESH_TOKEN_EXPIRATION,
      );
      this.onUserInfoChangeSubject$.next(USER_INFO);
    }
  }

  public async isAccessTokenExpired(): Promise<boolean> {
    // ****************************************************************************************************************************************
    // as our BCS backend token, not JWT we can not check expiration, se we disable this part
    // ****************************************************************************************************************************************
    // return new Promise((resolve, _reject) => {
    //     if (jwtHelperService.isTokenExpired(this.accessToken)) {
    //         resolve(true);
    //     } else {
    //         resolve(false);
    //     }
    // });
    // ***
    // this is simple return response
    // ***
    // return new Promise((resolve, _reject) => {
    //     if (this.accessToken) {
    //         resolve(false);
    //     } else {
    //         resolve(true);
    //     }
    // });
    // ****************************************************************************************************************************************
    // solution 2
    // ****************************************************************************************************************************************
    // const accessToken: string | null = this.browserStorageService.get(UkStoringProperty.ACCESS_TOKEN);
    // if (!accessToken) return true;
    // const payload = JSON.parse(atob(accessToken.split('.')[1]));
    // const expiry = payload.exp * 1000;
    // return Date.now() > expiry;
    // ****************************************************************************************************************************************
    return new Promise((resolve, _reject) => {
      if (!this.accessTokenExpiration && !this.refreshTokenExpiration) {
        resolve(true);

        return;
      }

      // ### [REFRESH-TOKEN-IMPROVE]
      // ************************************************************* start
      // this.accessTokenExpiration = this.browserStorageService.get(
      //     UkStoringProperty.ACCESS_TOKEN_EXPIRATION,
      // );
      // ************************************************************* end

      const CUR_TIME = Date.now();
      const TOKEN_EXPIRE_TIME = Number(this.accessTokenExpiration);

      if (CUR_TIME > TOKEN_EXPIRE_TIME) {
        resolve(true);

        return;
      }

      resolve(false);
    });
  }

  public async isRefreshTokenExpired(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      if (this.refreshTokenExpiration === 0) {
        resolve(true);
      }

      const CUR_TIME = Date.now();
      const REFRESH_EXPIRE_TIME = Number(this.refreshTokenExpiration);

      if (CUR_TIME > REFRESH_EXPIRE_TIME) {
        resolve(true);
      }

      resolve(false);
    });
  }

  public getTokensInfo(): UkTokesInfo {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      accessExpireTime: this.accessTokenExpiration,
    };
  }

  public getUserInfo(): UkUserInfo | null {
    return this.userInfo;
  }

  public getUserPrivate(): UkUserPrivate | null {
    if (this.userInfo?.user) {
      return this.userInfo.user;
    }

    return null;
  }

  public setUserToken(
    accessToken: string,
    refreshToken: string,
    tokenExpiration: number,
    refreshExpiration: number,
  ): void {
    // minute * second * millisecond
    const SAFE_MARGIN = 10 * 60 * 1000;
    let safeAccessTokenExpiration = tokenExpiration;
    let safeRefreshExpiration = refreshExpiration;

    // change if there is 2 times more than margin
    if (tokenExpiration - 2 * SAFE_MARGIN > Date.now()) {
      safeAccessTokenExpiration = tokenExpiration - SAFE_MARGIN;
    }

    // change if there is 2 times more than margin
    if (refreshExpiration - 2 * SAFE_MARGIN > Date.now()) {
      safeRefreshExpiration = refreshExpiration - SAFE_MARGIN;
    }

    this.loggerService.info(
      UkLoggerPart.REFRESH_TOKEN,
      'refresh token (authenticate) setUserToken',
      [
        {
          accessToken,
          refreshToken,
          tokenExpiration,
          safeAccessTokenExpiration,
          refreshExpiration,
          safeRefreshExpiration,
        },
      ],
    );

    this.accessToken = accessToken;
    this.accessTokenExpiration = safeAccessTokenExpiration;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiration = safeRefreshExpiration;

    const ACCESS_TOKEN = JSON.parse(JSON.stringify(this.accessToken));
    const REFRESH_TOKEN = JSON.parse(JSON.stringify(this.refreshToken));
    const ACCESS_TOKEN_EXPIRATION = JSON.parse(
      JSON.stringify(this.accessTokenExpiration),
    );
    const REFRESH_TOKEN_EXPIRATION = JSON.parse(
      JSON.stringify(this.refreshTokenExpiration),
    );

    this.onAccessTokenChangeSubject$.next(ACCESS_TOKEN);
    this.onAccessTokenExpirationChangeSubject$.next(ACCESS_TOKEN_EXPIRATION);
    this.onRefreshTokenChangeSubject$.next(REFRESH_TOKEN);
    this.onRefreshTokenExpirationChangeSubject$.next(REFRESH_TOKEN_EXPIRATION);

    this.browserStorageService.set(
      UkStoringProperty.ACCESS_TOKEN,
      this.accessToken,
    );
    this.browserStorageService.set(
      UkStoringProperty.REFRESH_TOKEN,
      this.refreshToken,
    );
    this.browserStorageService.set(
      UkStoringProperty.ACCESS_TOKEN_EXPIRATION,
      this.accessTokenExpiration as unknown as string,
    );
    this.browserStorageService.set(
      UkStoringProperty.REFRESH_TOKEN_EXPIRATION,
      this.refreshTokenExpiration as unknown as string,
    );
  }

  public setUserInfo(userInfo: UkUserInfo): void {
    this.userInfo = userInfo;
    const UI = JSON.parse(JSON.stringify(this.userInfo));

    this.onUserInfoChangeSubject$.next(UI);
    this.browserStorageService.set(
      UkStoringProperty.USER_INFO,
      userInfo as string, // in localStorage.helper changes to string
    );
  }

  public setUserPrivate(userPrivate: UkUserPrivate): void {
    if (this.userInfo) {
      this.userInfo.user = userPrivate;
      const USER_PRIVATE = JSON.parse(JSON.stringify(this.userInfo.user));

      this.onUserInfoPrivateChangeSubject$.next(USER_PRIVATE);
      this.browserStorageService.set(
        UkStoringProperty.USER_INFO,
        this.userInfo as string, // in localStorage.helper changes to string,
      );
    }
  }

  public async isUserAuthorized(): Promise<boolean> {
    const IS_ACCESS_TOKEN_EXPIRED = await this.isAccessTokenExpired();
    const IS_REFRESH_TOKEN_EXPIRED = await this.isRefreshTokenExpired();

    // TODO: uncomment complete auth policy
    // if (this.accessToken && this.userInfo?.user?.id && !isTokenExpired) {
    //   return true;
    // } else {
    //   this.clearAll();
    //   return false;
    // }
    return !(IS_ACCESS_TOKEN_EXPIRED && IS_REFRESH_TOKEN_EXPIRED);
  }

  public logout(): void {
    this.clearAll();
    void this.router.navigate(['/auth']);
  }

  public clearAll(): void {
    this.accessToken = null!;
    this.accessTokenExpiration = null!;
    this.refreshToken = null!;
    this.refreshTokenExpiration = null!;
    this.userInfo = null!;
    this.browserStorageService.clear(UkStoringProperty.ACCESS_TOKEN);
    this.browserStorageService.clear(UkStoringProperty.ACCESS_TOKEN_EXPIRATION);
    this.browserStorageService.clear(UkStoringProperty.REFRESH_TOKEN);
    this.browserStorageService.clear(
      UkStoringProperty.REFRESH_TOKEN_EXPIRATION,
    );
    this.browserStorageService.clear(UkStoringProperty.USER_INFO);

    // TODO: remove old props
    this.browserStorageService.clear(UkStoringProperty.TOKEN_EXPIRATION);
    this.browserStorageService.clear(UkStoringProperty.REFRESH_EXPIRATION);

    this.onAccessTokenChangeSubject$.next(null!);
    this.onAccessTokenExpirationChangeSubject$.next(null!);
    this.onRefreshTokenExpirationChangeSubject$.next(null!);
    this.onRefreshTokenChangeSubject$.next(null!);
    this.onResetUserInfoSubject$.next(true);

    this.onLogOutSubject$.next(true);
  }

  public refreshingToken(): Observable<string> {
    this.onRefreshTokenChangeSubject$.next('');

    return of('');
  }
}
