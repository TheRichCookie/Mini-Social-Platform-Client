import {createSelector} from '@ngrx/store';
import type {HangBaseState} from '@store/_base/_base.state';

import type {HangSearchState} from './search.state';

export const SEARCH_STATE = (state: HangBaseState): HangSearchState =>
  state.search;

export const SELECT_SEARCH_RESULTS = createSelector(
  SEARCH_STATE,
  (s: HangSearchState) => s.response,
);

export const SELECT_SEARCH_QUERY = createSelector(
  SEARCH_STATE,
  (s: HangSearchState) => s.query,
);
