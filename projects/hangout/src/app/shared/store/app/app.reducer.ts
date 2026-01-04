import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import * as APP_ACTIONS from '@store/app/app.action';
import {immerOn} from 'ngrx-immer/store';

import {APP_INITIAL_STATE} from './app.initial-state';
import type {HangAppState} from './app.state';

const reducer = createReducer(
  APP_INITIAL_STATE,

  immerOn(APP_ACTIONS.UPDATE_GET_CURRENT_UTC_TIME, (state, props) => {
    state.currentUtcTime = props.currentUtcTime;
  }),

  immerOn(APP_ACTIONS.UPDATE_HAS_NOTIFICATION, (state, props) => {
    state.hasUnreadNotification.response = props.response;
  }),
);

export const appReducer: (
  state: HangAppState | undefined,
  action: Action,
) => HangAppState = reducer;
