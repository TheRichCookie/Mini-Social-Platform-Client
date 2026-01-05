import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import {SEARCH_ACTIONS, SEARCH_RESET_ACTIONS} from './search.actions';
import {SEARCH_INITIAL_STATE} from './search.initial.state';
import type {HangSearchState} from './search.state';

const reducer = createReducer(
  SEARCH_INITIAL_STATE,

  immerOn(SEARCH_ACTIONS.$GET_SEARCH_USERS_UPDATE, (state, props) => {
    state.search.request.query = props.query;
    state.search.response = props.response;
    state.search.receivedTime = props.receivedTime;
  }),

  immerOn(SEARCH_RESET_ACTIONS.$RESET_SEARCH, () => SEARCH_INITIAL_STATE),
);

export const searchReducer: (
  state: HangSearchState | undefined,
  action: Action,
) => HangSearchState = reducer;
