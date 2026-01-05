import {createActionGroup, emptyProps, props} from '@ngrx/store';
import type {NotificationPaginationData} from '@utils/ui-kit/definitions';

export const NOTIFICATIONS_ACTIONS = createActionGroup({
  source: 'NOTIFICATIONS',
  events: {
    $GET_NOTIFICATIONS: props<{
      query: {
        page: number;
        limit: number;
      };
    }>(),
    $GET_NOTIFICATIONS_UPDATE: props<{
      query: {
        page: number;
        limit: number;
      };
      response: NotificationPaginationData;
      receivedTime: number;
    }>(),
    $MARK_AS_READ: props<{id: string}>(),
    $MARK_AS_READ_UPDATE: props<{id: string; receivedTime: number}>(),
  },
});

export const NOTIFICATIONS_RESET_ACTIONS = createActionGroup({
  source: 'NOTIFICATIONS',
  events: {
    $RESET_NOTIFICATIONS: emptyProps(),
  },
});
