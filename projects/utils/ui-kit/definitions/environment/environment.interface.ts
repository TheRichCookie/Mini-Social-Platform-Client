import type { NgxLoggerLevel } from 'ngx-logger';

export interface UkEnvironment {
  name: UkEnvironmentName;
  production: boolean;
  serviceWorker: boolean;
  apiBaseUrl: UkEnvironmentBaseUrl;
  fileBaseUrl: UkEnvironmentFileBaseUrl;
  clientId: UkEnvironmentClientId;
  androidClientId: UkEnvironmentClientId;
  logger: UkEnvironmentLogger;
  paymentInfo: UkEnvironmentPaymentInfo;
  enableAnimation: boolean;
  enableSoundEffect: boolean;
}

export enum UkEnvironmentName {
  DEVELOPMENT = 'DEVELOPMENT',
  TEST = 'TEST',
  STAGE = 'STAGE',
  PRODUCTION = 'PRODUCTION',
}

export interface UkEnvironmentBaseUrl {
  common: string;
}

export enum UkEnvironmentClientId {
  APP = 'hangout',
}

export interface UkEnvironmentFileBaseUrl {
  document: string;
  avatar: string;
  public: string;
}

export interface UkEnvironmentLogger {
  level: NgxLoggerLevel;
  serverLevel: NgxLoggerLevel;
  serverUrl: string;
}

export interface UkEnvironmentPaymentInfo {
  paymentUrl: string;
}
