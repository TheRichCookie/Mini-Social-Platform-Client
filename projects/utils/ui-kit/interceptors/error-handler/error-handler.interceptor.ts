import type {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { UkLoggerPart, UkLoggerService } from '@utils/ui-kit/services';
import { catchError } from 'rxjs';

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
      }

      if (error instanceof Error) {
        //
      }

      if (error instanceof HttpErrorResponse) {
        const handler = handlers.find((_handler) => _handler.matcher(error));

        return handler
          ? handler.handleError(req, error)
          : DEFAULT_HANDLER.handleError(req, error);
      }

      return DEFAULT_HANDLER.handleError(req, error as HttpErrorResponse);
    }),
  );
};
