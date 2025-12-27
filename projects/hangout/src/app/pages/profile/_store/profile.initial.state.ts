import type {HangProfileState} from './profile.state';

export const PROFILE_INITIAL_STATE: HangProfileState = {
  user: {
    _id: undefined!,
    username: undefined!,
    email: undefined!,
    bio: undefined!,
    avatar: undefined!,
    major: undefined!,
    createdAt: undefined!,
  },
  posts: [],
  followers: undefined!,
  following: undefined!,
  receivedTime: undefined!,
};
