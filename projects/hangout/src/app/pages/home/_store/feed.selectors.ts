import {createSelector} from '@ngrx/store';
import type {HangBaseState} from '@store/_base/_base.state';

import type {HangFeedState} from './feed.state';

export const FEED_STATE = (state: HangBaseState): HangFeedState => state.feed;

export const SELECT_FEED_POSTS = createSelector(
  FEED_STATE,
  (s: HangFeedState) => s.response,
);
