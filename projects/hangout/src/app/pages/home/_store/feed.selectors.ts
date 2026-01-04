import type {HangBaseState} from '@app/shared/store/_base/_base.state';
import {createSelector} from '@ngrx/store';

import type {HangFeedState} from './feed.state';

export const FEED_STATE = (state: HangBaseState): HangFeedState => state.feed;

export const SELECT_FEEDS_RES = createSelector(
  FEED_STATE,
  (s: HangFeedState) => s.feed.get.response,
);
