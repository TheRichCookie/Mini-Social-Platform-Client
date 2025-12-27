import type {HangSearchState} from './search.state';

export const SEARCH_INITIAL_STATE: HangSearchState = {
  query: undefined!,
  response: [],
  receivedTime: undefined!,
  error: {receivedTime: undefined!, message: undefined!},
};
