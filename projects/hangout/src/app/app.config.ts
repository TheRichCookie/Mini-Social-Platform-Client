import type {ApplicationConfig} from '@angular/core';
import {
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {environment} from '@environments/environment';
import {provideStore} from '@ngrx/store';
import {createCommonProviders} from '@utils/ui-kit/providers';
import {GENERAL_TOKEN} from '@utils/ui-kit/settings';

import {routes} from './app.routes';
import {HangStoreModule} from './shared/store/_/modules/store.module';
import {baseReducers, metaReducers} from './shared/store/_base/_base.reducer';

const APP_PROVIDERS = createCommonProviders(environment).concat([
  provideBrowserGlobalErrorListeners(),
  provideZoneChangeDetection({eventCoalescing: true}),
  provideRouter(routes),
  provideStore(baseReducers, {metaReducers}),
  importProvidersFrom(HangStoreModule),
  {
    provide: GENERAL_TOKEN,
    useValue: {
      baseUrl: environment.apiBaseUrl,
      clientId: environment.clientId,
      androidClientId: environment.androidClientId,
    },
  },
]);

export const appConfig: ApplicationConfig = {
  providers: APP_PROVIDERS,
};
