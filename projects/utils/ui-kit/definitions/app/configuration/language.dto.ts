import type {UkAppDirection} from './app-direction.enum';
import type {UkDateType} from './date-type.enum';
import type {UkLanguageCode} from './language-code.enum';
import type {UkLanguageLocale} from './language-locale.enum';
import type {UkLanguageName} from './language-name.enum';

export interface UkLanguage {
  id: number;
  name: UkLanguageName;
  languageCode: UkLanguageCode;
  languageLocale: UkLanguageLocale;
  phonePrefix: string;
  flagUrl: string;
  direction: UkAppDirection;
  dateType: UkDateType;
}
