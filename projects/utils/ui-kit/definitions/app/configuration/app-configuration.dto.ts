import type { UkGeneralConfiguration } from './general-configuration.dto';
import type { UkUserConfiguration } from './user-configuration.dto';

export interface UkAppConfiguration {
  userConfiguration: UkUserConfiguration;
  generalConfiguration: UkGeneralConfiguration;
}
