import type {
  CreatePostRequest,
  PostModel,
} from '@utils/ui-kit/definitions/swagger/swagger';

export interface HangPostState {
  post: {
    request: {
      body: CreatePostRequest;
    };
    response: PostModel;
    receivedTime: number;
  };
}
