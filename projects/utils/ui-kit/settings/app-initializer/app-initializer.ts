import {inject, provideAppInitializer} from '@angular/core';
import {UkAppInitService, UkSocketService} from '@utils/ui-kit/services';

export const APP_INITIALIZERS = [
  provideAppInitializer(() => inject(UkAppInitService).initApp()),
  provideAppInitializer(() => inject(UkAppInitService).appPreparation()),
  provideAppInitializer(() => inject(UkAppInitService).printLogo()),
  provideAppInitializer(() => inject(UkSocketService).connect()),
];
