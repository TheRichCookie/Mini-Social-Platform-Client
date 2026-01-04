import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import {
  NOTIFICATIONS_ACTIONS,
  NOTIFICATIONS_RESET_ACTIONS,
} from './notifications.actions';
import {NOTIFICATIONS_INITIAL_STATE} from './notifications.initial.state';
import type {HangNotificationsState} from './notifications.state';

const reducer = createReducer(
  NOTIFICATIONS_INITIAL_STATE,
  immerOn(NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS_UPDATE, (state, props) => {
    state.notification.get.request.query = props.query;
    state.notification.get.response = props.response;
    state.notification.get.receivedTime = props.receivedTime;
  }),

  immerOn(NOTIFICATIONS_ACTIONS.$MARK_AS_READ_UPDATE, (state, props) => {
    state.notification.markAsRead.request.id = props.id;
    state.notification.markAsRead.receivedTime = props.receivedTime;
  }),

  // reset
  immerOn(
    NOTIFICATIONS_RESET_ACTIONS.$RESET_NOTIFICATIONS,
    () => NOTIFICATIONS_INITIAL_STATE,
  ),
);

export const notificationsReducer: (
  state: HangNotificationsState | undefined,
  action: Action,
) => HangNotificationsState = reducer;
