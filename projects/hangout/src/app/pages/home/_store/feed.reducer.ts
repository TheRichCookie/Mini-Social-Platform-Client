import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import * as FEED_ACTION from './feed.actions';
import {FEED_INITIAL_STATE} from './feed.initial.state';
import type {HangFeedState} from './feed.state';

const reducer = createReducer(
  FEED_INITIAL_STATE,

  immerOn(FEED_ACTION.FEED_ACTIONS.$GET_FEED_UPDATE, (state, props) => {
    state.response = props.response ?? [];
    state.receivedTime = props.receivedTime;
  }),
);

export const feedReducer: (
  state: HangFeedState | undefined,
  action: Action,
) => HangFeedState = reducer;
