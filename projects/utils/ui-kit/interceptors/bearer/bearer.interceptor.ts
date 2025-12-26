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
  const LOGGER_SERVICE = inject(UkLoggerService);

  if (request.headers.has('X-Skip-Adding-Bearer')) {
    return next(
      request.clone({
        headers: request.headers.delete('X-Skip-Adding-Bearer'),
      }),
    );
  }

  if (request.headers.has('X-Skip-On-Authenticating')) {
    return next(
      request.clone({
        headers: request.headers.delete('X-Skip-On-Authenticating'),
      }),
    );
  }

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
    }),
  );
};
