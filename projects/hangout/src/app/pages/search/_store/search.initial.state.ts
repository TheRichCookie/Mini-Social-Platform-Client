import type {HangSearchState} from './search.state';

const SEARCH_INITIAL = {
  request: {
    query: {
      q: undefined!,
      page: undefined!,
      limit: undefined!,
    },
  },
  response: {
    users: [],
    total: undefined!,
    totalPages: undefined!,
  },
  receivedTime: undefined!,
};

export const SEARCH_INITIAL_STATE: HangSearchState = {
  search: SEARCH_INITIAL,
};
