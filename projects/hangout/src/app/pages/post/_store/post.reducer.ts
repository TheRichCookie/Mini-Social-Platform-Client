import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import {POST_ACTIONS, POST_RESET_ACTIONS} from './post.actions';
import {POST_INITIAL_STATE} from './post.initial.state';
import type {HangPostState} from './post.state';

const reducer = createReducer(
  POST_INITIAL_STATE,
  immerOn(POST_ACTIONS.$ADD_POST_UPDATE, (state, props) => {
    state.post.request.body = props.body;
    state.post.response = props.response;
    state.post.receivedTime = props.receivedTime;
  }),

  // reset
  immerOn(POST_RESET_ACTIONS.$RESET_POST, () => POST_INITIAL_STATE),
);

export const postReducer: (
  state: HangPostState | undefined,
  action: Action,
) => HangPostState = reducer;
