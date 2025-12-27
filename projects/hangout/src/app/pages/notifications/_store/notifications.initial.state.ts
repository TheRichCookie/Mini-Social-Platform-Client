import type {HangNotificationsState} from './notifications.state';

export const NOTIFICATIONS_INITIAL_STATE: HangNotificationsState = {
  notifications: [],
  unreadCount: 0,
  receivedTime: undefined,
  error: {receivedTime: undefined, message: undefined},
};
