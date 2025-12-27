import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import * as SEARCH_ACTION from './search.actions';
import {SEARCH_INITIAL_STATE} from './search.initial.state';
import type {HangSearchState} from './search.state';

const reducer = createReducer(
  SEARCH_INITIAL_STATE,

  immerOn(
    SEARCH_ACTION.SEARCH_ACTIONS.$GET_SEARCH_USERS_UPDATE,
    (state, props) => {
      state.response = props.response ?? [];
      state.receivedTime = props.receivedTime;
    },
  ),
);

export const searchReducer: (
  state: HangSearchState | undefined,
  action: Action,
) => HangSearchState = reducer;
