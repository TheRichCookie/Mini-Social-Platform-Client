import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import {
  COMMENT_ACTIONS,
  FEED_ACTIONS,
  FEED_RESET_ACTIONS,
  LIKE_ACTIONS,
} from './feed.actions';
import {COMMENT_INITIAL, FEED_INITIAL_STATE} from './feed.initial.state';
import type {HangFeedState} from './feed.state';

const reducer = createReducer(
  FEED_INITIAL_STATE,

  immerOn(FEED_ACTIONS.$GET_FEEDS_UPDATE, (state, props) => {
    state.feed.get.receivedTime = props.receivedTime;
    state.feed.get.request.query = props.query;
    state.feed.get.response = props.response;
  }),

  immerOn(LIKE_ACTIONS.$TOGGLE_LIKE_UPDATE, (state, props) => {
    state.like.toggle.receivedTime = props.receivedTime;
    state.like.toggle.request.postId = props.postId;
  }),

  immerOn(COMMENT_ACTIONS.$GET_COMMENTS_UPDATE, (state, props) => {
    state.comment.get.receivedTime = props.receivedTime;
    state.comment.get.request.postId = props.postId;
    state.comment.get.request.query = props.query;
    state.comment.get.response = props.response;
  }),
  immerOn(COMMENT_ACTIONS.$ADD_COMMENT_UPDATE, (state, props) => {
    state.comment.add.receivedTime = props.receivedTime;
    state.comment.add.request.postId = props.postId;
    state.comment.add.request.body = props.body;
    state.comment.add.response = props.response;
  }),
  immerOn(COMMENT_ACTIONS.$DELETE_COMMENT_UPDATE, (state, props) => {
    state.comment.delete.receivedTime = props.receivedTime;
    state.comment.delete.request.commentId = props.commentId;
  }),

  immerOn(FEED_RESET_ACTIONS.$RESET_FEEDS, () => FEED_INITIAL_STATE),
  immerOn(FEED_RESET_ACTIONS.$RESET_COMMENTS, (state) => {
    state.comment = COMMENT_INITIAL;
  }),
);

export const feedReducer: (
  state: HangFeedState | undefined,
  action: Action,
) => HangFeedState = reducer;
