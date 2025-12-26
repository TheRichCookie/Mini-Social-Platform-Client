import { InjectionToken } from '@angular/core';
import type { UkEnvironmentLogger } from '@utils/ui-kit/definitions';

export interface UkEnvironmentConfig {
  logger: UkEnvironmentLogger;
}

export const ENVIRONMENT_TOKEN = new InjectionToken<UkEnvironmentConfig>('');
