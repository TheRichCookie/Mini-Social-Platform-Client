import type {Action} from '@ngrx/store';
import {createReducer, on} from '@ngrx/store';
import * as APP_ACTIONS from '@store/app/app.action';
import {produce} from 'immer';

import {APP_INITIAL_STATE} from './app.initial-state';
import type {HangAppState} from './app.state';

const reducer = createReducer(
  APP_INITIAL_STATE,

  // // reset_state
  // immerOn(APP_ACTIONS.RESET_STATE, (state: DonAppState) =>
  //     produce(state, (draft: DonAppState) => {
  //         Object.assign(draft, APP_INITIAL_STATE);
  //     }),
  // ),

  on(
    APP_ACTIONS.UPDATE_GET_CURRENT_UTC_TIME,
    produce((state, props) => {
      state.currentUtcTime = props.currentUtcTime;
    }),
  ),
);

export const appReducer: (
  state: HangAppState | undefined,
  action: Action,
) => HangAppState = reducer;
