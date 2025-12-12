import {inject, provideAppInitializer} from '@angular/core';
import {UkAppInitService} from '@utils/ui-kit/services';

export const APP_INITIALIZERS = [
  provideAppInitializer(async () => inject(UkAppInitService).initApp()),
  provideAppInitializer(async () =>
    inject(UkAppInitService).checkTokenExpiration(),
  ),
  provideAppInitializer(async () => inject(UkAppInitService).appPreparation()),
  provideAppInitializer(async () => inject(UkAppInitService).printLogo()),
];
