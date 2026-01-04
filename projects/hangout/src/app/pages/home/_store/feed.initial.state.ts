import type {HangFeedState} from './feed.state';

export const FEED_INITIAL_STATE: HangFeedState = {
  feed: {
    get: {
      request: {
        query: {
          page: undefined!,
          limit: undefined!,
        },
      },
      response: {
        items: [],
        totalCount: undefined!,
      },
      receivedTime: undefined!,
    },
  },
};
