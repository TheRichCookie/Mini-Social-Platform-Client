import type {HttpInterceptorFn} from '@angular/common/http';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {UkLoggerPart, UkLoggerService} from '@utils/ui-kit/services';
import {tap} from 'rxjs';

export const LOGGING_HTTP_REQUEST_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  req,
  next,
) => {
  const LOGGER_SERVICE: UkLoggerService = inject(UkLoggerService);
  const START_TIME = Date.now();

  LOGGER_SERVICE.info(
    UkLoggerPart.LOG_HTTP,
    `HTTP Req: [${req.method}] ${req.url}`,
    [req],
  );

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpRequest) {
        // Skip logging intermediate events (progress)
        return;
      }

      if (event instanceof HttpResponse) {
        const RESPONSE = event;
        const END_TIME = Date.now();
        const RESPONSE_TIME = END_TIME - START_TIME;

        LOGGER_SERVICE.info(
          UkLoggerPart.LOG_HTTP,
          `HTTP Res: [${req.method}] ${req.url} (status: ${RESPONSE.status}, duration: ${RESPONSE_TIME}ms)`,
          [RESPONSE],
        );
      }
    }),
  );
};
