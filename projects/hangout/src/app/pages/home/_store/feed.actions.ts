import {createActionGroup, emptyProps, props} from '@ngrx/store';

import type {FeedPostModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export const FEED_ACTIONS = createActionGroup({
  source: 'FEED',
  events: {
    $GET_FEED_POST: emptyProps(),
    $GET_FEED_UPDATE: props<{
      response: FeedPostModel[];
      receivedTime: number;
    }>(),
    $TOGGLE_LIKE_POST: props<{postId: string}>(),
  },
});
