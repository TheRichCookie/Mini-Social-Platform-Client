import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import {
  UkAlertService,
  UkAuthenticateService,
  UkAuthService,
} from '@utils/ui-kit/services';
import {catchError, exhaustMap, of, switchMap} from 'rxjs';

import type {
  CommonResponseViewModel,
  OtpVerificationDataModel,
  SignInDataModel,
  SignUpDataModel,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import * as AUTH_ACTION from './auth.actions';

@Injectable({providedIn: 'root'})
export class HangAuthEffects {
  private readonly actions = inject(Actions);
  private readonly authService = inject(UkAuthService);
  private readonly alertService = inject(UkAlertService);
  private readonly authenticateService = inject(UkAuthenticateService);

  public signIn$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AUTH_ACTION.SIGN_IN_ACTIONS.$SIGN_IN_POST),
      exhaustMap((props) =>
        this.authService.signIn(props.request).pipe(
          switchMap((res: CommonResponseViewModel<SignInDataModel>) => {
            if (res.code === 200) {
              return of(
                AUTH_ACTION.SIGN_IN_ACTIONS.$SIGN_IN_UPDATE({
                  request: props.request,
                  response: res.data,
                  receivedTime: Date.now(),
                }),
              );
            }

            if (res.code === 404) {
              this.alertService.error(
                'ورود ناموفق',
                'کاربری با این مشخصات یافت نشد.',
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'signIn$',
                error: String(res.code),
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
      ofType(AUTH_ACTION.SIGN_UP_ACTIONS.$SIGN_UP_POST),
      exhaustMap((props) =>
        this.authService.signUp(props.request).pipe(
          switchMap((res: CommonResponseViewModel<SignUpDataModel>) => {
            if (res.code === 200) {
              return of(
                AUTH_ACTION.SIGN_UP_ACTIONS.$SIGN_UP_UPDATE({
                  request: props.request,
                  response: res.data,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'signUp$',
                error: String(res.code),
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
      ofType(AUTH_ACTION.OTP_ACTIONS.$OTP_POST),
      exhaustMap((props) =>
        this.authService.otp(props.request).pipe(
          switchMap(
            (res: CommonResponseViewModel<OtpVerificationDataModel>) => {
              if (res.code === 200) {
                if (res.data?.token) {
                  this.authenticateService.setToken(res.data?.token);
                }

                return of(
                  AUTH_ACTION.OTP_ACTIONS.$OTP_UPDATE({
                    request: props.request,
                    response: res.data,
                    receivedTime: Date.now(),
                  }),
                );
              }

              if (res.code === 400) {
                this.alertService.error(res.message);
              }

              return of(
                APP_ACTIONS.UPDATE_HTTP_FAIL({
                  timestamp: Date.now(),
                  methodName: 'otp$',
                  error: String(res.code),
                }),
              );
            },
          ),
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
