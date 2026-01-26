import type {HangBaseState} from '@app/shared/store/_base/_base.state';
import {createSelector} from '@ngrx/store';

import type {HangFeedState} from './feed.state';

export const FEED_STATE = (state: HangBaseState): HangFeedState => state.feed;

export const SELECT_FEEDS_RES = createSelector(
  FEED_STATE,
  (s: HangFeedState) => s.feed.get.response,
);
export const SELECT_TOGGLE_LIKE_RECEIVED_TIME = createSelector(
  FEED_STATE,
  (s: HangFeedState) => s.like.toggle.receivedTime,
);
export const SELECT_COMMENTS_RES = createSelector(
  FEED_STATE,
  (s: HangFeedState) => s.comment.get.response,
);
export const SELECT_ADD_COMMENTS_RES = createSelector(
  FEED_STATE,
  (s: HangFeedState) => s.comment.add.response,
);
