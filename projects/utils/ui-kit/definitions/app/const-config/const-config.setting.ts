import { UkConfigApiVersions } from './config-api-version.interface';
import type { UkConstConfig } from './const-config';

export const CONST_CONFIG: UkConstConfig = {
  COMPANY_INFO: {
    ADDRESS: '',
    PHONE_NUMBER: '02191004055',
    FAX: '',
    EMAIL: '',
  },
  COMMON: {
    MAX_MOBILE_WIDTH: 360,
    MAX_MOBILE_WIDTH_PADDED: 330,
    APP_HEADER_HEIGHT: 60,
    APP_TAB_BAR_HEIGHT: 60,
    //
    MAX_DESKTOP_WIDTH: 1400,
    MAX_DESKTOP_WIDTH_PADDED: 1315,
    DESKTOP_HEADER: 90,
    DESKTOP_FOOTER: 540,
  },
  SERVICE: {
    AUTH: 'auth',
    COMMENTS: 'comments',
    FEED: 'feed',
    LIKES: 'likes',
    POSTS: 'posts',
    PROFILE: 'profile',
    FOLLOW: 'follow',
    USERS: 'users',
    NOTIFICATIONS: 'notifications',
  },
  API_VERSION: {
    V1: UkConfigApiVersions.V1,
    V2: UkConfigApiVersions.V2,
    V3: UkConfigApiVersions.V3,
  },
  API_BASE_URL: {
    common: 'COMMON',
  },
};
