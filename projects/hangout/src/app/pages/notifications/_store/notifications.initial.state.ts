import type {HangNotificationsState} from './notifications.state';

export const NOTIFICATIONS_INITIAL_STATE: HangNotificationsState = {
  notification: {
    get: {
      request: {
        query: {
          page: undefined!,
          limit: undefined!,
        },
      },
      response: {
        items: [],
        totalCount: undefined!,
      },
      receivedTime: undefined!,
    },
    markAsRead: {
      request: {
        id: undefined!,
      },
      receivedTime: undefined!,
    },
  },
};
