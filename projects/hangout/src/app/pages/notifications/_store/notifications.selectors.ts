import {createFeatureSelector, createSelector} from '@ngrx/store';

import type {HangNotificationsState} from './notifications.state';

const NOTIFICATIONS_STATE =
  createFeatureSelector<HangNotificationsState>('notifications');

export const SELECT_NOTIFICATIONS = createSelector(
  NOTIFICATIONS_STATE,
  (s) => s.notifications,
);
export const SELECT_NOTIFICATIONS_UNREAD_COUNT = createSelector(
  NOTIFICATIONS_STATE,
  (s) => s.unreadCount,
);
export const SELECT_NOTIFICATIONS_RECEIVED_TIME = createSelector(
  NOTIFICATIONS_STATE,
  (s) => s.receivedTime,
);
export const SELECT_NOTIFICATIONS_ERROR = createSelector(
  NOTIFICATIONS_STATE,
  (s) => s.error,
);
