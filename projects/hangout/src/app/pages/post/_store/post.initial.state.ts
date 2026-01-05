import type {HangPostState} from './post.state';

export const POST_INITIAL: HangPostState['post'] = {
  request: {
    body: {
      content: undefined!,
    },
  },
  response: {
    _id: undefined!,
    userId: undefined!,
    content: undefined!,
    createdAt: undefined!,
  },
  receivedTime: undefined!,
};

export const POST_INITIAL_STATE: HangPostState = {
  post: POST_INITIAL,
};
