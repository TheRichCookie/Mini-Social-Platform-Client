import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import {
  PROFILE_DETAIL_ACTIONS,
  PROFILE_EDIT_ACTIONS,
  PROFILE_FOLLOW_ACTIONS,
  PROFILE_RESET_ACTIONS,
} from './profile.actions';
import {
  FOLLOWERS_INITIAL,
  FOLLOWING_INITIAL,
  PROFILE_INITIAL_STATE,
} from './profile.initial.state';
import type {HangProfileState} from './profile.state';

const reducer = createReducer(
  PROFILE_INITIAL_STATE,
  immerOn(PROFILE_DETAIL_ACTIONS.$GET_PROFILE_DETAIL_UPDATE, (state, props) => {
    state.profile.get.request.userId = props.userId;
    state.profile.get.response = props.response;
    state.profile.get.receivedTime = props.receivedTime;
  }),
  immerOn(PROFILE_DETAIL_ACTIONS.$GET_PROFILE_POSTS_UPDATE, (state, props) => {
    state.posts.get.request.userId = props.userId;
    state.posts.get.request.query = props.query;
    state.posts.get.response = props.response;
    state.posts.get.receivedTime = props.receivedTime;
  }),
  immerOn(
    PROFILE_DETAIL_ACTIONS.$DELETE_PROFILE_POST_UPDATE,
    (state, props) => {
      state.posts.delete.request.postId = props.postId;
      state.posts.delete.receivedTime = props.receivedTime;
    },
  ),
  immerOn(
    PROFILE_DETAIL_ACTIONS.$POST_PROFILE_TOGGLE_FOLLOW_UPDATE,
    (state, props) => {
      state.profile.follow.request.userId = props.userId;
      state.profile.follow.receivedTime = props.receivedTime;
    },
  ),
  immerOn(PROFILE_EDIT_ACTIONS.$PATCH_PROFILE_DETAIL_UPDATE, (state, props) => {
    state.profile.patch.request.body = props.body;
    state.profile.patch.response = props.response;
    state.profile.patch.receivedTime = props.receivedTime;
  }),
  immerOn(
    PROFILE_FOLLOW_ACTIONS.$GET_PROFILE_FOLLOWERS_UPDATE,
    (state, props) => {
      state.followers.request.userId = props.userId;
      state.followers.request.query = props.query;
      state.followers.response = props.response;
      state.followers.receivedTime = props.receivedTime;
    },
  ),
  immerOn(
    PROFILE_FOLLOW_ACTIONS.$GET_PROFILE_FOLLOWING_UPDATE,
    (state, props) => {
      state.following.request.userId = props.userId;
      state.following.request.query = props.query;
      state.following.response = props.response;
      state.following.receivedTime = props.receivedTime;
    },
  ),

  // reset
  immerOn(PROFILE_RESET_ACTIONS.$RESET_PROFILE, () => PROFILE_INITIAL_STATE),
  immerOn(PROFILE_RESET_ACTIONS.$RESET_FOLLOW, (state) => {
    state.followers = FOLLOWERS_INITIAL;
    state.following = FOLLOWING_INITIAL;
  }),
);

export const profileReducer: (
  state: HangProfileState | undefined,
  action: Action,
) => HangProfileState = reducer;
