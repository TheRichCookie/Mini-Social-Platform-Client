import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import {NOTIFICATIONS_ACTIONS} from './notifications.actions';
import {NOTIFICATIONS_INITIAL_STATE} from './notifications.initial.state';

export const notificationsReducer = createReducer(
  NOTIFICATIONS_INITIAL_STATE,
  immerOn(
    NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS_UPDATE,
    (draft, {notifications, receivedTime}) => {
      draft.notifications = notifications;
      draft.unreadCount = notifications.filter((n) => !n?.isRead).length;
      draft.receivedTime = receivedTime;
    },
  ),
  immerOn(NOTIFICATIONS_ACTIONS.$MARK_AS_READ_UPDATE, (draft, {id}) => {
    const idx = draft.notifications.findIndex((n) => n?._id === id);

    if (idx > -1) {
      draft.notifications[idx].isRead = true;
    }

    draft.unreadCount = draft.notifications.filter((n) => !n?.isRead).length;
  }),
  immerOn(
    NOTIFICATIONS_ACTIONS.$RECEIVED_NOTIFICATION_UPDATE,
    (draft, {notification, receivedTime}) => {
      // prepend new notification and update unread count
      draft.notifications = [notification, ...(draft.notifications ?? [])];
      draft.unreadCount = draft.notifications.filter((n) => !n?.isRead).length;
      draft.receivedTime = receivedTime;
    },
  ),
  immerOn(NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS_ERROR, (draft, {error}) => {
    draft.error = error;
    draft.receivedTime = error.receivedTime;
  }),
);
