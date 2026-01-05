import {createSelector} from '@ngrx/store';
import type {HangBaseState} from '@store/_base/_base.state';

import type {HangSearchState} from './search.state';

export const SEARCH_STATE = (state: HangBaseState): HangSearchState =>
  state.search;

export const SELECT_SEARCH_USERS_RES = createSelector(
  SEARCH_STATE,
  (s: HangSearchState) => s.search.response,
);
