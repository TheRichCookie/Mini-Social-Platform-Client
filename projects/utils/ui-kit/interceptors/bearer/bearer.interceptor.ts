import type {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import {inject} from '@angular/core';
import {
  UkAuthenticateService,
  UkLoggerPart,
  UkLoggerService,
} from '@utils/ui-kit/services';
import {from, switchMap} from 'rxjs';

export const BEARER_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const AUTHENTICATE_SERVICE: UkAuthenticateService = inject(
    UkAuthenticateService,
  );
  // const REFRESH_TOKEN_SERVICE: UkRefreshTokenService = inject(
  //   UkRefreshTokenService,
  // );
  const LOGGER_SERVICE = inject(UkLoggerService);

  if (request.headers.has('X-Skip-Adding-Bearer')) {
    return next(
      request.clone({headers: request.headers.delete('X-Skip-Adding-Bearer')}),
    );
  }

  if (request.headers.has('X-Skip-On-Authenticating')) {
    return next(
      request.clone({
        headers: request.headers.delete('X-Skip-On-Authenticating'),
      }),
    );
  }

  // in refresh token scenario, we set Authorization, in refresh-token-service
  if (request.headers.has('X-Skip-On-Refreshing-Token')) {
    LOGGER_SERVICE.info(
      UkLoggerPart.REFRESH_TOKEN,
      'refresh token (bearer) Skip-On-Refreshing-Token',
      [request],
    );

    return next(request);
  }

  return from(AUTHENTICATE_SERVICE.isTokenExpired()).pipe(
    switchMap((isExpired: boolean) => {
      if (!isExpired || request.headers.has('X-Unnecessary-Token')) {
        const TOKEN = AUTHENTICATE_SERVICE.token;

        if (TOKEN) {
          const AUTHORIZATION = `Bearer ${TOKEN}`;

          return next(
            request.clone({
              headers: request.headers.append('Authorization', AUTHORIZATION),
            }),
          );
        }

        return next(request);
      }

      return next(request);

      // if (!REFRESH_TOKEN_SERVICE.isRefreshing) {
      //   LOGGER_SERVICE.info(
      //     UkLoggerPart.REFRESH_TOKEN,
      //     'refresh token (bearer) not isRefreshing',
      //     [],
      //   );

      // return REFRESH_TOKEN_SERVICE.refreshToken().pipe(
      //   switchMap((refreshTokenResult) => {
      //     if (refreshTokenResult === UkRefreshTokenResult.FAILED) {
      //       LOGGER_SERVICE.error(
      //         UkLoggerPart.REFRESH_TOKEN,
      //         'refresh token (bearer) refreshTokenResult',
      //         [refreshTokenResult],
      //       );
      //       REFRESH_TOKEN_SERVICE.refreshingFailed();

      //       return next(request.clone());
      //     } else {
      //       LOGGER_SERVICE.info(
      //         UkLoggerPart.REFRESH_TOKEN,
      //         'refresh token (bearer) clone request',
      //         [],
      //       );
      //       const AUTHORIZATION = `Bearer ${refreshTokenResult.accessToken}`;

      //       return next(
      //         request.clone({
      //           headers: request.headers.append(
      //             'Authorization',
      //             AUTHORIZATION,
      //           ),
      //         }),
      //       );
      //     }
      //   }),
      //   catchError((error) => {
      //     LOGGER_SERVICE.error(
      //       UkLoggerPart.REFRESH_TOKEN,
      //       'refresh token (bearer) catchError',
      //       [
      //         {
      //           error,
      //         },
      //       ],
      //     );
      //     REFRESH_TOKEN_SERVICE.refreshingFailed();

      //     // return throwError(() => error);
      //     return next(request);
      //   }),
      //   finalize(() => {
      //     LOGGER_SERVICE.error(
      //       UkLoggerPart.REFRESH_TOKEN,
      //       'refresh token (bearer) finalize',
      //       [],
      //     );
      //     REFRESH_TOKEN_SERVICE.discardRefreshing();
      //   }),
      // );
      // }

      // return REFRESH_TOKEN_SERVICE.refreshTokenSubject$.pipe(
      //   switchMap((refreshTokenResult: RefreshTokenResult) => {
      //     if (refreshTokenResult === UkRefreshTokenResult.FAILED) {
      //       REFRESH_TOKEN_SERVICE.refreshingFailed();

      //       return next(request.clone());
      //     } else {
      //       const AUTHORIZATION = `Bearer ${refreshTokenResult.accessToken}`;

      //       return next(
      //         request.clone({
      //           headers: request.headers.append('Authorization', AUTHORIZATION),
      //         }),
      //       );
      //     }
      //   }),
      // );
    }),
  );
};
