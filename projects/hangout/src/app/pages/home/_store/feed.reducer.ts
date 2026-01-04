import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import {FEED_ACTIONS, FEED_REST_ACTIONS} from './feed.actions';
import {FEED_INITIAL_STATE} from './feed.initial.state';
import type {HangFeedState} from './feed.state';

const reducer = createReducer(
  FEED_INITIAL_STATE,

  immerOn(FEED_ACTIONS.$GET_FEEDS_UPDATE, (state, props) => {
    state.feed.get.receivedTime = props.receivedTime;
    state.feed.get.request.query = props.query;
    state.feed.get.response = props.response;
  }),

  immerOn(FEED_REST_ACTIONS.$RESET_FEEDS, () => FEED_INITIAL_STATE),
);

export const feedReducer: (
  state: HangFeedState | undefined,
  action: Action,
) => HangFeedState = reducer;
