import type {FeedPaginationData} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangFeedState {
  feed: {
    get: {
      request: {
        query: {
          page: number;
          limit: number;
        };
      };
      response: FeedPaginationData;
      receivedTime: number;
    };
  };
}
