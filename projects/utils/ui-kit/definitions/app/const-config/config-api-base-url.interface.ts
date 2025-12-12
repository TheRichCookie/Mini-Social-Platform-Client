export interface UkConfigApiBaseUrl {
  COMMON: string;
}

export enum UkConfigApiBaseUrls {
  COMMON = 'common',
}

export type ConfigApiBaseUrls = `${UkConfigApiBaseUrls}`;
