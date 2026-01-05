import type {HangFeedState} from './feed.state';

export const FEED_INITIAL = {
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
};
export const LIKE_INITIAL = {
  toggle: {
    request: {
      postId: undefined!,
    },
    receivedTime: undefined!,
  },
};
export const COMMENT_INITIAL = {
  get: {
    request: {
      postId: undefined!,
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

  add: {
    request: {
      postId: undefined!,
      body: {
        text: undefined!,
      },
    },
    response: {
      _id: undefined!,
      postId: undefined!,
      text: undefined!,
      userId: {
        _id: undefined!,
        username: undefined!,
        avatar: undefined!,
      },
      createdAt: undefined!,
    },
    receivedTime: undefined!,
  },

  delete: {
    request: {
      commentId: undefined!,
    },
    receivedTime: undefined!,
  },
};

export const FEED_INITIAL_STATE: HangFeedState = {
  feed: FEED_INITIAL,
  like: LIKE_INITIAL,
  comment: COMMENT_INITIAL,
};
