import {createReducer} from '@ngrx/store';

import {PROFILE_INITIAL_STATE} from './profile.initial.state';

export const profileReducer = createReducer(
  PROFILE_INITIAL_STATE,
  // immerOn(PROFILE_ACTIONS.$GET_PROFILE_DETAIL_UPDATE, (draft, {payload}) => {
  //   draft.user = payload.user;
  //   draft.receivedTime = payload.receivedTime;
  // }),
  // immerOn(PROFILE_ACTIONS.$GET_PROFILE_POSTS_UPDATE, (draft, {payload}) => {
  //   draft.posts = payload.posts;
  //   draft.receivedTime = payload.receivedTime;
  // }),
  // immerOn(PROFILE_ACTIONS.$TOGGLE_FOLLOW_PROFILE_UPDATE, (draft, {payload}) => {
  //   draft.user = payload.user;
  //   draft.receivedTime = payload.receivedTime;
  // }),
  // immerOn(PROFILE_ACTIONS.$GET_PROFILE_ERROR, (draft, {payload}) => {
  //   draft.error = payload.error;
  //   draft.receivedTime = payload.receivedTime;
  // }),
);
