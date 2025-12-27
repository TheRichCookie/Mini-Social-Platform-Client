import type {HangFeedState} from './feed.state';

export const FEED_INITIAL_STATE: HangFeedState = {
  response: [],
  receivedTime: undefined!,
  error: {receivedTime: undefined!, message: undefined!},
};
