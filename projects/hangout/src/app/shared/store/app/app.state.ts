import type {
  HasUnreadNotificationsData,
  UkHttpFail,
  UkWorldUtcTime,
} from '@utils/ui-kit/definitions';

export interface HangAppState {
  layout: {
    showHeader: boolean;
    showTabs: boolean;
  };
  general: {
    httpFail: UkHttpFail;
  };
  header: {
    title: string;
  };
  staticData: {
    contract: string;
    rules: string;
  };
  hasUnreadNotification: {
    response: HasUnreadNotificationsData;
  };
  currentUtcTime: UkWorldUtcTime;
}
