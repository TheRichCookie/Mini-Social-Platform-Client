import type {FeedPostModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangFeedState {
  response: FeedPostModel[];
  receivedTime?: number;
  error: {receivedTime?: number; message?: string};
}
