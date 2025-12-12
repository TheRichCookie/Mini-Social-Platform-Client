/* eslint-disable @typescript-eslint/member-ordering */
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import type {
  TokenVerifyCommandResult,
  UkResponse,
} from '@utils/ui-kit/definitions';
import {UkStoringProperty} from '@utils/ui-kit/definitions';
import {
  UkAlertService,
  UkAuthenticateService,
  UkBrowserStorageService,
  UkLoggerPart,
  UkLoggerService,
} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';
import {catchError, from, map, of, Subject, switchMap} from 'rxjs';

export enum UkRefreshTokenResult {
  FAILED = 'FAILED',
}
export type RefreshTokenResult =
  | TokenVerifyCommandResult
  | UkRefreshTokenResult;

@Injectable({
  providedIn: 'root',
})
export class UkRefreshTokenService {
  private readonly authenticateService = inject(UkAuthenticateService);
  private readonly browserStorageService = inject(UkBrowserStorageService);
  private readonly httpClient = inject(HttpClient);
  private readonly alertService = inject(UkAlertService);
  private readonly loggerService = inject(UkLoggerService);
  private readonly router = inject(Router);
  private readonly refreshTokenEndpoint = 'auth/token/refresh';

  private _isRefreshing = false;
  private _isDiscarded = false;

  // ### [REFRESH-TOKEN-IMPROVE]
  // ************************************************************* start
  public refreshTokenSubject$: Subject<RefreshTokenResult> =
    new Subject<RefreshTokenResult>();

  // public refreshTokenSubject$!: Subject<RefreshTokenResult>;
  // ************************************************************* end

  public set isRefreshing(v: boolean) {
    this._isRefreshing = v;
  }

  public get isDiscarded(): boolean {
    return this._isDiscarded;
  }

  public set isDiscarded(v: boolean) {
    this._isDiscarded = v;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public get isRefreshing(): boolean {
    return this._isRefreshing;
  }

  public refreshingFailed(): void {
    this.discardRefreshing();
    this.isDiscarded = false;
    this.authenticateService.logout();
  }

  public discardRefreshing(): void {
    if (!this.isDiscarded) {
      this.isDiscarded = true;
      this.refreshTokenSubject$.next(UkRefreshTokenResult.FAILED);
      this.refreshTokenSubject$.complete();
      this.isRefreshing = false;
    }
  }

  public refreshToken(): Observable<RefreshTokenResult> {
    return from(this.authenticateService.isRefreshTokenExpired()).pipe(
      switchMap((isExpired) => {
        if (isExpired) {
          this.loggerService.warn(
            UkLoggerPart.REFRESH_TOKEN,
            'refresh token expired',
          );
          this.refreshingFailed();

          return of(UkRefreshTokenResult.FAILED);
        }

        const accessToken: string | null = this.browserStorageService.get(
          UkStoringProperty.ACCESS_TOKEN,
        );
        const refreshToken: string | null = this.browserStorageService.get(
          UkStoringProperty.REFRESH_TOKEN,
        );

        this.loggerService.info(
          UkLoggerPart.REFRESH_TOKEN,
          'try to refresh token',
          [
            {
              accessToken,
              refreshToken,
              isRefreshing: this.isRefreshing,
            },
          ],
        );

        if (!refreshToken) {
          return of(UkRefreshTokenResult.FAILED);
        }

        if (this.isRefreshing) {
          return this.refreshTokenSubject$.pipe(
            switchMap((tokenInfo) =>
              tokenInfo ? of(tokenInfo) : of(UkRefreshTokenResult.FAILED),
            ),
          );
        }

        this.isRefreshing = true;
        this.isDiscarded = false;

        // ### [REFRESH-TOKEN-IMPROVE]
        // ************************************************************* start
        // this.refreshTokenSubject$ = new Subject<UkRefreshTokenResult>();
        // ************************************************************* end

        const URL = this.refreshTokenEndpoint;
        const BODY = {accessToken, refreshToken};
        const HEADERS = new HttpHeaders({
          'X-Skip-On-Refreshing-Token': 'true',
          'Content-Type': 'application/json',
        });

        return this.httpClient
          .post<
            UkResponse<TokenVerifyCommandResult>
          >(URL, BODY, {headers: HEADERS})
          .pipe(
            map((res) => {
              this.loggerService.info(
                UkLoggerPart.REFRESH_TOKEN,
                'refresh token response',
                [res],
              );

              if (res.code === 200) {
                this.authenticateService.setUserToken(
                  res.data.accessToken as string,
                  res.data.refreshToken as string,
                  res.data.accessTokenExpiration as number,
                  res.data.refreshTokenExpiration as number,
                );

                this.isRefreshing = false;
                this.refreshTokenSubject$.next(res.data);
                this.refreshTokenSubject$.complete();

                return res.data;
              }

              if (res.code === 500) {
                this.alertService.error(res.message);
              }

              this.loggerService.error(
                UkLoggerPart.REFRESH_TOKEN,
                'refresh token (refreshToken) wrong api response',
                [],
              );
              this.refreshingFailed();

              return UkRefreshTokenResult.FAILED;
            }),
            catchError((_error) => {
              this.loggerService.error(
                UkLoggerPart.REFRESH_TOKEN,
                'refresh token (refreshToken) catch-error',
                [],
              );
              this.refreshingFailed();

              return of(UkRefreshTokenResult.FAILED);
            }),
          );
      }),
    );
  }
}
