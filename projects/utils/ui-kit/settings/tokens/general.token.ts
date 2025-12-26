import {InjectionToken} from '@angular/core';
import type {UkEnvironmentBaseUrl} from '@utils/ui-kit/definitions';

export interface UkApiConfig {
  baseUrl: UkEnvironmentBaseUrl;
  clientId: string;
  androidClientId: string;
}

export const GENERAL_TOKEN = new InjectionToken<UkApiConfig>('');
