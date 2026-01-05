import type {HangBaseState} from '@app/shared/store/_base/_base.state';
import {createSelector} from '@ngrx/store';

import type {HangNotificationsState} from './notifications.state';

export const NOTIFICATIONS_STATE = (
  state: HangBaseState,
): HangNotificationsState => state.notifications;

export const SELECT_NOTIFICATIONS_RES = createSelector(
  NOTIFICATIONS_STATE,
  (s) => s.notification.get.response,
);
export const SELECT_NOTIFICATIONS_MARK_AS_READ_RECEIVED_TIME = createSelector(
  NOTIFICATIONS_STATE,
  (s) => s.notification.markAsRead.receivedTime,
);
