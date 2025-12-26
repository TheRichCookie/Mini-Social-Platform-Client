import {InjectionToken} from '@angular/core';

export interface UkClientConfig {
  bcsClient: string;
}

export const API_BCS_CLIENT_TOKEN = new InjectionToken<UkClientConfig>('');
