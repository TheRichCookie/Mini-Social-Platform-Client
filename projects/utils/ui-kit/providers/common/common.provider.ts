import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import type { EnvironmentProviders, Provider } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  API_HEADER_VERSION_INTERCEPTOR_FUNCTIONAL,
  API_SERVICE_INTERCEPTOR_FUNCTIONAL,
  BASE_URL_INTERCEPTOR_FUNCTIONAL,
  BEARER_INTERCEPTOR_FUNCTIONAL,
  CLIENT_INTERCEPTOR_FUNCTIONAL,
  ERROR_HANDLER_INTERCEPTOR_FUNCTIONAL,
  LOADER_INTERCEPTOR_FUNCTIONAL,
  LOGGING_HTTP_REQUEST_INTERCEPTOR_FUNCTIONAL,
  RETRY_INTERCEPTOR_FUNCTIONAL,
  TOO_LATE_RESPONSE_INTERCEPTOR_FUNCTIONAL,
  ukProvideHttpErrorHandling,
} from '@utils/ui-kit/interceptors';
import { UkLoggerColorScheme } from '@utils/ui-kit/services';
import { APP_INITIALIZERS, UkErrorInitializer } from '@utils/ui-kit/settings';
import player from 'lottie-web';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import {
  provideCacheableAnimationLoader,
  provideLottieOptions,
} from 'ngx-lottie';
import { provideToastr } from 'ngx-toastr';

import type { UkEnvironment } from '../../definitions';

export const createCommonProviders = (
  environment: UkEnvironment,
): Array<EnvironmentProviders | Provider> => [
  ...APP_INITIALIZERS,
  provideLottieOptions({ player: () => player }),
  provideCacheableAnimationLoader(),
  importProvidersFrom(UkErrorInitializer),
  provideAnimations(),
  provideToastr({
    timeOut: 3000,
    positionClass: 'toast-bottom-center',
  }),
  importProvidersFrom(
    LoggerModule.forRoot({
      level: environment.logger.level || NgxLoggerLevel.DEBUG,
      serverLogLevel: environment.logger.serverLevel || NgxLoggerLevel.ERROR,
      serverLoggingUrl: environment.logger.serverUrl || '',
      colorScheme: [
        UkLoggerColorScheme.TRACE,
        UkLoggerColorScheme.DEBUG,
        UkLoggerColorScheme.INFO,
        UkLoggerColorScheme.LOG,
        UkLoggerColorScheme.WARN,
        UkLoggerColorScheme.ERROR,
        UkLoggerColorScheme.FATAL,
      ],
    }),
  ),
  provideHttpClient(
    withFetch(),
    withInterceptors([
      RETRY_INTERCEPTOR_FUNCTIONAL,
      API_HEADER_VERSION_INTERCEPTOR_FUNCTIONAL,
      API_SERVICE_INTERCEPTOR_FUNCTIONAL,
      BASE_URL_INTERCEPTOR_FUNCTIONAL,
      BEARER_INTERCEPTOR_FUNCTIONAL,
      CLIENT_INTERCEPTOR_FUNCTIONAL,
      ERROR_HANDLER_INTERCEPTOR_FUNCTIONAL,
      TOO_LATE_RESPONSE_INTERCEPTOR_FUNCTIONAL,
      LOGGING_HTTP_REQUEST_INTERCEPTOR_FUNCTIONAL,
      LOADER_INTERCEPTOR_FUNCTIONAL,
    ]),
    withInterceptorsFromDi(),
  ),
  ukProvideHttpErrorHandling(),
];
