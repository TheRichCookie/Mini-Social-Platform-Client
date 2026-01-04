import {createActionGroup, emptyProps, props} from '@ngrx/store';

import type {FeedPaginationData} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export const FEED_ACTIONS = createActionGroup({
  source: 'FEED',
  events: {
    $GET_FEEDS: props<{
      query: {
        page: number;
        limit: number;
      };
    }>(),
    $GET_FEEDS_UPDATE: props<{
      query: {
        page: number;
        limit: number;
      };
      response: FeedPaginationData;
      receivedTime: number;
    }>(),
  },
});

export const FEED_REST_ACTIONS = createActionGroup({
  source: 'FEED',
  events: {
    $RESET_FEEDS: emptyProps(),
  },
});
