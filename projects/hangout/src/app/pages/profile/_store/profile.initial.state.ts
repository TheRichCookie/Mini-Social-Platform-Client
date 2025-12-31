import type {HangProfileState} from './profile.state';

export const PROFILE_INITIAL: HangProfileState['profile'] = {
  get: {
    request: {
      userId: undefined!,
    },
    response: {
      user: {
        _id: undefined!,
        username: undefined!,
        email: undefined!,
        avatar: undefined!,
        bio: undefined!,
        major: undefined!,
        createdAt: undefined!,
      },
      followers: undefined!,
      following: undefined!,
      isMe: undefined!,
      isFollowing: undefined!,
    },
    receivedTime: undefined!,
  },
  patch: {
    request: {
      body: {bio: undefined!, avatar: undefined!, major: undefined!},
    },
    response: {
      _id: undefined!,
      username: undefined!,
      email: undefined!,
      avatar: undefined!,
      bio: undefined!,
      major: undefined!,
      createdAt: undefined!,
    },
    receivedTime: undefined!,
  },
};

export const POSTS_INITIAL: HangProfileState['posts'] = {
  request: {
    userId: undefined!,
    query: {
      page: undefined!,
      limit: undefined!,
    },
  },
  response: {
    totalCount: undefined!,
    items: [],
  },
  receivedTime: undefined!,
};

export const FOLLOWERS_INITIAL: HangProfileState['followers'] = {
  request: {
    userId: undefined!,
    query: {
      page: undefined!,
      limit: undefined!,
    },
  },
  response: {
    totalCount: undefined!,
    items: [],
  },
  receivedTime: undefined!,
};

export const FOLLOWING_INITIAL: HangProfileState['following'] = {
  request: {
    userId: undefined!,
    query: {
      page: undefined!,
      limit: undefined!,
    },
  },
  response: {
    totalCount: undefined!,
    items: [],
  },
  receivedTime: undefined!,
};

export const PROFILE_INITIAL_STATE: HangProfileState = {
  profile: PROFILE_INITIAL,
  posts: POSTS_INITIAL,
  followers: FOLLOWERS_INITIAL,
  following: FOLLOWING_INITIAL,
};
