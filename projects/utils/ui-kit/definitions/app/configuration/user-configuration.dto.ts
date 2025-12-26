import type { UkLanguage } from './language.dto';
import type { UkSettings } from './settings.dto';
import type { UkUi } from './ui.dto';

export interface UkUserConfiguration {
  language: UkLanguage;
  ui: UkUi;
  settings: UkSettings;
}
