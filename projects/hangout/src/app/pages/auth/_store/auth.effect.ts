import type {HttpResponse} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import type {
  OtpResponseModel,
  SignInResponseViewModel,
  SignUpResponseViewModel,
} from '@utils/ui-kit/definitions';
import {
  UkAlertService,
  UkAuthenticateService,
  UkAuthService,
} from '@utils/ui-kit/services';
import {catchError, exhaustMap, of, switchMap} from 'rxjs';

import * as AUTH_ACTION from './auth.action';

@Injectable({providedIn: 'root'})
export class HangAuthEffects {
  private readonly actions = inject(Actions);
  private readonly authService = inject(UkAuthService);
  private readonly authenticateService = inject(UkAuthenticateService);
  private readonly alertService = inject(UkAlertService);

  public signIn$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AUTH_ACTION.POST_SIGN_IN_AUTH),
      exhaustMap((props) =>
        this.authService.signIn(props.request).pipe(
          switchMap((res: HttpResponse<SignInResponseViewModel>) => {
            if (res.status === 200 && res.body) {
              return of(
                AUTH_ACTION.UPDATE_SIGN_IN_AUTH({
                  request: props.request,
                  response: res.body,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'signIn$',
                error: String(res.status),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'signIn$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });

  public signUp$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AUTH_ACTION.POST_SIGN_UP_AUTH),
      exhaustMap((props) =>
        this.authService.signUp(props.request).pipe(
          switchMap((res: HttpResponse<SignUpResponseViewModel>) => {
            if (res.status === 200 && res.body) {
              return of(
                AUTH_ACTION.UPDATE_SIGN_UP_AUTH({
                  request: props.request,
                  response: res.body,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'signUp$',
                error: String(res.status),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'signUp$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });

  public otp$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AUTH_ACTION.POST_OTP_AUTH),
      exhaustMap((props) =>
        this.authService.otp(props.request).pipe(
          switchMap((res: HttpResponse<OtpResponseModel>) => {
            if (res.status === 200 && res.body) {
              return of(
                AUTH_ACTION.UPDATE_OTP_AUTH({
                  request: props.request,
                  response: res.body,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'otp$',
                error: String(res.status),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'otp$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
