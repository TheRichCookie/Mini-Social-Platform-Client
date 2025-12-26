import type {UkEnvironment} from '@utils/ui-kit/definitions';
import {
  UkEnvironmentClientId,
  UkEnvironmentName,
} from '@utils/ui-kit/definitions';
import {NgxLoggerLevel} from 'ngx-logger';

export const environment: UkEnvironment = {
  name: UkEnvironmentName.TEST,
  production: false,
  serviceWorker: true,
  apiBaseUrl: {
    common: 'https://api/',
  },
  fileBaseUrl: {
    document: '',
    avatar: '',
    public: '',
  },
  clientId: UkEnvironmentClientId.APP,
  androidClientId: UkEnvironmentClientId.APP,
  logger: {
    level: NgxLoggerLevel.WARN,
    serverLevel: NgxLoggerLevel.OFF,
    serverUrl: '/v1/logger',
  },
  paymentInfo: {
    paymentUrl: '',
  },
  enableAnimation: true,
  enableSoundEffect: true,
};
