
export const createCommonProviders = (
  environment: UkEnvironment,
): Array<EnvironmentProviders | Provider> => [
  ...APP_INITIALIZERS,
  provideLottieOptions({player: () => player}),
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
      // url-process
      API_VERSION_INTERCEPTOR_FUNCTIONAL,
      API_SERVICE_INTERCEPTOR_FUNCTIONAL,
      BASE_URL_INTERCEPTOR_FUNCTIONAL,
      //
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
