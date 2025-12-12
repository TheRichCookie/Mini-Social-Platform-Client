import type {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {UkLoggerPart, UkLoggerService} from '@utils/ui-kit/services';
import {retry, throwError, timer} from 'rxjs';

const RETRY_CONFIG = {
  count: 2, // this number in indicate retry, so we have count+1 request
  delay: 1000,
  status: [408, 429, 500, 502, 503, 504],
};

export const RETRY_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  request,
  next,
) => {
  const LOGGER_SERVICE: UkLoggerService = inject(UkLoggerService);

  return next(request).pipe(
    retry({
      count: RETRY_CONFIG.count,
      delay: (error: HttpErrorResponse, retryCount: number) => {
        const IS_INCLUDED_ERROR = RETRY_CONFIG.status.includes(error.status);

        if (IS_INCLUDED_ERROR) {
          LOGGER_SERVICE.info(
            UkLoggerPart.REQ_RETRYING,
            `Retrying request, attempt ${retryCount}`,
            [request],
          );

          return timer(RETRY_CONFIG.delay);
        }

        return throwError(() => error);
      },
    }),
  );
};
