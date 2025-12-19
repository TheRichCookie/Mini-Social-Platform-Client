import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
// import {JwtHelperService} from '@auth0/angular-jwt';
import {UkStoringProperty} from '@utils/ui-kit/definitions';
import type {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

import {UkBrowserStorageService} from '../browser-storage/browser-storage.service';
import {UkJwtService, UkLoggerService} from '../public-api';

// const jwtHelperService = new JwtHelperService();

export interface UkTokesInfo {
  token: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UkAuthenticateService {
  private readonly onTokenChangeSubject$ = new BehaviorSubject<string>(null!);

  private readonly onLogOutSubject$ = new BehaviorSubject<boolean | null>(null);

  public readonly loggerService = inject(UkLoggerService);
  public readonly browserStorageService = inject(UkBrowserStorageService);
  public readonly router = inject(Router);
  public readonly store = inject(Store);
  public readonly httpClient = inject(HttpClient);
  public readonly jwtService = inject(UkJwtService);

  public onTokenChange$: Observable<string> =
    this.onTokenChangeSubject$.asObservable();

  public onLogOutChangeStatus$: Observable<boolean | null> =
    this.onLogOutSubject$.asObservable();

  public token: string | null = '';
  public refreshToken: string | null = '';

  constructor() {
    this.token = this.browserStorageService.get(UkStoringProperty.TOKEN);

    if (!this.token) {
      this.clearAll();
    } else {
      const TOKEN = JSON.parse(JSON.stringify(this.token));

      this.onTokenChangeSubject$.next(TOKEN);
    }
  }

  public async isTokenExpired(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      if (this.jwtService.isTokenExpired(this.token)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  public getTokensInfo(): UkTokesInfo {
    return {
      token: this.token,
    };
  }

  public setToken(token: string): void {
    this.token = token;

    const TOKEN = JSON.parse(JSON.stringify(this.token));

    this.onTokenChangeSubject$.next(TOKEN);

    this.browserStorageService.set(UkStoringProperty.TOKEN, this.token);
  }

  public async isUserAuthorized(): Promise<boolean> {
    const IS_TOKEN_EXPIRED = await this.isTokenExpired();

    return !IS_TOKEN_EXPIRED;
  }

  public logout(): void {
    this.clearAll();
    void this.router.navigate(['/auth']);
  }

  public clearAll(): void {
    this.token = null!;

    this.browserStorageService.clear(UkStoringProperty.TOKEN);

    this.onTokenChangeSubject$.next(null!);

    this.onLogOutSubject$.next(true);
  }
}
