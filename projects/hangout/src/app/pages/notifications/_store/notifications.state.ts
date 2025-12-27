import type {NotificationModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangNotificationsState {
  notifications: NotificationModel[];
  unreadCount: number;
  receivedTime: number | undefined;
  error: {
    receivedTime: number | undefined;
    message: string | undefined;
  };
}
