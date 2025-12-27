import {createFeatureSelector, createSelector} from '@ngrx/store';

import type {HangProfileState} from './profile.state';

const PROFILE_STATE = createFeatureSelector<HangProfileState>('profile');

export const SELECT_PROFILE_USER = createSelector(PROFILE_STATE, (s) => s.user);
export const SELECT_PROFILE_POSTS = createSelector(
  PROFILE_STATE,
  (s) => s.posts,
);
export const SELECT_PROFILE_FOLLOWERS = createSelector(
  PROFILE_STATE,
  (s) => s.followers,
);
export const SELECT_PROFILE_FOLLOWING = createSelector(
  PROFILE_STATE,
  (s) => s.following,
);
export const SELECT_PROFILE_RECEIVED_TIME = createSelector(
  PROFILE_STATE,
  (s) => s.receivedTime,
);
