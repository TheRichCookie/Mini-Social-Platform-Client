import type {
  UkConfigApiService,
  UkConfigApiVersion,
  UkEnvironmentBaseUrl,
} from '@utils/ui-kit/definitions';

export interface UkConstConfig {
  COMPANY_INFO: UkComponyInfo;
  COMMON: UkCommonSettings;
  API_BASE_URL: UkEnvironmentBaseUrl;
  API_VERSION: UkConfigApiVersion;
  SERVICE: UkConfigApiService;
}

export interface UkCommonSettings {
  MAX_MOBILE_WIDTH: number;
  MAX_MOBILE_WIDTH_PADDED: number;
  APP_HEADER_HEIGHT: number;
  APP_TAB_BAR_HEIGHT: number;
  //
  MAX_DESKTOP_WIDTH: number;
  MAX_DESKTOP_WIDTH_PADDED: number;
  DESKTOP_HEADER: number;
  DESKTOP_FOOTER: number;
}

export interface UkComponyInfo {
  ADDRESS: string;
  PHONE_NUMBER: string;
  FAX: string;
  EMAIL: string;
}
