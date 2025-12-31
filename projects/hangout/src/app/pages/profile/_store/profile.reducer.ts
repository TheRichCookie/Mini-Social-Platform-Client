import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import {PROFILE_ACTIONS} from './profile.actions';
import {PROFILE_INITIAL_STATE} from './profile.initial.state';
import type {HangProfileState} from './profile.state';

const reducer = createReducer(
  PROFILE_INITIAL_STATE,
  immerOn(PROFILE_ACTIONS.$GET_PROFILE_DETAIL_UPDATE, (state, props) => {
    state.profile.get.request.userId = props.userId;
    state.profile.get.response = props.response;
    state.profile.get.receivedTime = props.receivedTime;
  }),
  immerOn(PROFILE_ACTIONS.$PATCH_PROFILE_DETAIL_UPDATE, (state, props) => {
    state.profile.patch.request.body = props.body;
    state.profile.patch.response = props.response;
    state.profile.patch.receivedTime = props.receivedTime;
  }),
  immerOn(PROFILE_ACTIONS.$GET_PROFILE_POSTS_UPDATE, (state, props) => {
    state.posts.request.userId = props.userId;
    state.posts.request.query = props.query;
    state.posts.response = props.response;
    state.posts.receivedTime = props.receivedTime;
  }),
  immerOn(PROFILE_ACTIONS.$GET_PROFILE_FOLLOWERS_UPDATE, (state, props) => {
    state.posts.request.userId = props.userId;
    state.posts.request.query = props.query;
    state.posts.response = props.response;
    state.posts.receivedTime = props.receivedTime;
  }),
  immerOn(PROFILE_ACTIONS.$GET_PROFILE_FOLLOWING_UPDATE, (state, props) => {
    state.posts.request.userId = props.userId;
    state.posts.request.query = props.query;
    state.posts.response = props.response;
    state.posts.receivedTime = props.receivedTime;
  }),
);

export const profileReducer: (
  state: HangProfileState | undefined,
  action: Action,
) => HangProfileState = reducer;
