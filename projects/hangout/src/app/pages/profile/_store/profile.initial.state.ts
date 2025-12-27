import type {HangProfileState} from './profile.state';

export const PROFILE_INITIAL_STATE: HangProfileState = {
  user: undefined!,
  posts: [],
  followers: undefined!,
  following: undefined!,
  receivedTime: undefined!,
  error: {receivedTime: undefined!, message: undefined!},
};
