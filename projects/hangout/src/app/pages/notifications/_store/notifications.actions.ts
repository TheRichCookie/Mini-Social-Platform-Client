import {createActionGroup, emptyProps, props} from '@ngrx/store';

import type {NotificationModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export const NOTIFICATIONS_ACTIONS = createActionGroup({
  source: 'NOTIFICATIONS',
  events: {
    $GET_NOTIFICATIONS: emptyProps(),
    $GET_NOTIFICATIONS_UPDATE: props<{
      notifications: NotificationModel[];
      receivedTime: number;
    }>(),
    $MARK_AS_READ: props<{id: string}>(),
    $MARK_AS_READ_UPDATE: props<{id: string}>(),
    $RECEIVED_NOTIFICATION: props<{notification: NotificationModel}>(),
    $RECEIVED_NOTIFICATION_UPDATE: props<{
      notification: NotificationModel;
      receivedTime: number;
    }>(),
    $GET_NOTIFICATIONS_ERROR: props<{
      error: {message: string | undefined; receivedTime: number};
    }>(),
  },
});
