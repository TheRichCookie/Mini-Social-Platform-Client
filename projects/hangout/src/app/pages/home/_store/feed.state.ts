import type {
  AddCommentRequest,
  CommentModel,
  CommentPaginationData,
  FeedPaginationData,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

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
  like: {
    toggle: {
      request: {
        postId: string;
      };
      receivedTime: number;
    };
  };
  comment: {
    get: {
      request: {
        postId: string;
        query: {
          page: number;
          limit: number;
        };
      };
      response: CommentPaginationData;
      receivedTime: number;
    };
    add: {
      request: {
        postId: string;
        body: AddCommentRequest;
      };
      response: CommentModel;
      receivedTime: number;
    };
    delete: {
      request: {
        commentId: string;
      };
      receivedTime: number;
    };
  };
}
