import type {NotificationPaginationData} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangNotificationsState {
  notification: {
    get: {
      request: {
        query: {
          page: number;
          limit: number;
        };
      };
      response: NotificationPaginationData;
      receivedTime: number;
    };
    markAsRead: {
      request: {
        id: string;
      };
      receivedTime: number;
    };
  };
}
