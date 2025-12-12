import type {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {UkLoggerPart, UkLoggerService} from '@utils/ui-kit/services';
import {catchError, finalize, switchMap} from 'rxjs';

import type {RefreshTokenResult} from '../../services/refresh-token/refresh-token.service';
import {
  UkRefreshTokenResult,
  UkRefreshTokenService,
} from '../../services/refresh-token/refresh-token.service';
import {
  ukInjectDefaultErrorHandler,
  ukInjectHttpErrorHandlers,
} from './error-handler.tokens';

export const ERROR_HANDLER_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const handlers = ukInjectHttpErrorHandlers();
  const DEFAULT_HANDLER = ukInjectDefaultErrorHandler();
  const REFRESH_TOKEN_SERVICE = inject(UkRefreshTokenService);
  const LOGGER_SERVICE = inject(UkLoggerService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        LOGGER_SERVICE.info(
          UkLoggerPart.REFRESH_TOKEN,
          'refresh token (error-handler) HttpErrorResponse',
          [
            {
              error,
            },
          ],
        );

        return REFRESH_TOKEN_SERVICE.refreshToken().pipe(
          switchMap((refreshTokenResult: RefreshTokenResult) => {
            if (refreshTokenResult === UkRefreshTokenResult.FAILED) {
              LOGGER_SERVICE.error(
                UkLoggerPart.REFRESH_TOKEN,
                'refresh token (error-handler) refreshTokenResult',
                [refreshTokenResult],
              );
              REFRESH_TOKEN_SERVICE.refreshingFailed();

              return next(req.clone());
            } else {
              LOGGER_SERVICE.info(
                UkLoggerPart.REFRESH_TOKEN,
                'refresh token (error-handler) clone request',
                [],
              );
              const AUTHORIZATION = `Bearer ${refreshTokenResult.accessToken}`;
              const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', AUTHORIZATION),
              });

              return next(clonedRequest);
            }
          }),
          catchError((_error) => {
            LOGGER_SERVICE.error(
              UkLoggerPart.REFRESH_TOKEN,
              'refresh token (error-handler) catchError',
              [
                {
                  _error,
                },
              ],
            );
            REFRESH_TOKEN_SERVICE.refreshingFailed();

            // return throwError(() => refreshError);
            return next(req);
          }),
          finalize(() => {
            LOGGER_SERVICE.error(
              UkLoggerPart.REFRESH_TOKEN,
              'refresh token (error-handler) finalize',
              [],
            );
            REFRESH_TOKEN_SERVICE.discardRefreshing();
          }),
        );
      }

      if (error instanceof Error) {
        //
      }

      if (error instanceof HttpErrorResponse) {
        if (req.headers.has('X-Skip-On-Refreshing-Token')) {
          REFRESH_TOKEN_SERVICE.discardRefreshing();
        }

        const handler = handlers.find((_handler) => _handler.matcher(error));

        return handler
          ? handler.handleError(req, error)
          : DEFAULT_HANDLER.handleError(req, error);
      }

      return DEFAULT_HANDLER.handleError(req, error as HttpErrorResponse);
    }),
  );
};
