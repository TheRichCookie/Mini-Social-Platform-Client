import type {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {UkLoggerPart, UkLoggerService} from '@utils/ui-kit/services';
import {finalize} from 'rxjs';

export const TOO_LATE_RESPONSE_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  req,
  next,
) => {
  const LOGGER_SERVICE: UkLoggerService = inject(UkLoggerService);
  const START_TIME = Date.now();
  const MAX_VALID_TIME = 500;

  return next(req).pipe(
    finalize(() => {
      const END_TIME = Date.now();
      const RESPONSE_TIME = END_TIME - START_TIME;

      if (RESPONSE_TIME > MAX_VALID_TIME) {
        LOGGER_SERVICE.warn(
          UkLoggerPart.TOO_LATE,
          `Request to ${req.url} took ${RESPONSE_TIME}ms`,
        );
      }
    }),
  );
};
