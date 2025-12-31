import type {HangBaseState} from '@app/shared/store/_base/_base.state';
import {createSelector} from '@ngrx/store';

import type {HangProfileState} from './profile.state';

export const PROFILE_STATE = (state: HangBaseState): HangProfileState =>
  state.profile;

export const SELECT_PROFILE_DETAIL_RES = createSelector(
  PROFILE_STATE,
  (s) => s.profile.get.response,
);
export const SELECT_PROFILE_PATCH_RES = createSelector(
  PROFILE_STATE,
  (s) => s.profile.patch.response,
);
export const SELECT_PROFILE_POSTS_RES = createSelector(
  PROFILE_STATE,
  (s) => s.posts.response,
);

export const SELECT_PROFILE_FOLLOWERS_RES = createSelector(
  PROFILE_STATE,
  (s) => s.followers.response,
);
export const SELECT_PROFILE_FOLLOWING_RES = createSelector(
  PROFILE_STATE,
  (s) => s.following.response,
);
