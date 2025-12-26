import type { EnvironmentProviders } from '@angular/core';
import {
  inject,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';

import type {
  UkHttpErrorHandler,
  UkMatchableHttpErrorHandler,
} from './error-handler.abstract';
import { UkCorsErrorHandler } from './handlers/cors-error.handler';
import { UkDefaultErrorHandler } from './handlers/default-error.handler';
import { UkInternalServerErrorHandler } from './handlers/internal-server-error.handler';
import { UkNotFoundErrorHandler } from './handlers/not-found-error.handler';

export const MATCHABLE_ERROR_HANDLERS_TOKEN =
  new InjectionToken<UkMatchableHttpErrorHandler>(
    '[MATCHABLE_ERROR_HANDLERS_TOKEN]: Error handler injection token',
  );

export const DEFAULT_ERROR_HANDLER_TOKEN =
  new InjectionToken<UkHttpErrorHandler>(
    '[DEFAULT_ERROR_HANDLER_TOKEN]: Default error handler injection token',
  );

export function ukInjectHttpErrorHandlers(): UkMatchableHttpErrorHandler[] {
  return inject<UkMatchableHttpErrorHandler[]>(MATCHABLE_ERROR_HANDLERS_TOKEN);
}
export function ukInjectDefaultErrorHandler(): UkHttpErrorHandler {
  return inject(DEFAULT_ERROR_HANDLER_TOKEN);
}

export function ukProvideHttpErrorHandling(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: DEFAULT_ERROR_HANDLER_TOKEN,
      useExisting: UkDefaultErrorHandler,
    },
    {
      provide: MATCHABLE_ERROR_HANDLERS_TOKEN,
      useExisting: UkNotFoundErrorHandler,
      multi: true,
    },
    {
      provide: MATCHABLE_ERROR_HANDLERS_TOKEN,
      useExisting: UkCorsErrorHandler,
      multi: true,
    },
    {
      provide: MATCHABLE_ERROR_HANDLERS_TOKEN,
      useExisting: UkInternalServerErrorHandler,
      multi: true,
    },
  ]);
}
