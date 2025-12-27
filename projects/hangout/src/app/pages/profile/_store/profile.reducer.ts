import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import {PROFILE_ACTIONS} from './profile.actions';
import {PROFILE_INITIAL_STATE} from './profile.initial.state';

export const profileReducer = createReducer(
  PROFILE_INITIAL_STATE,
  immerOn(PROFILE_ACTIONS.$GET_PROFILE_DETAIL_UPDATE, (state, props) => {
    state.user = props.response;
    state.receivedTime = props.receivedTime;
  }),
  immerOn(PROFILE_ACTIONS.$GET_PROFILE_POSTS_UPDATE, (state, props) => {
    state.posts = props.response;
    state.receivedTime = props.receivedTime;
  }),
);
