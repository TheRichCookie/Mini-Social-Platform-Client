import {createActionGroup, emptyProps, props} from '@ngrx/store';
import type {CreatePostRequest, PostModel} from '@utils/ui-kit/definitions';

export const POST_ACTIONS = createActionGroup({
  source: 'POST',
  events: {
    $ADD_POST: props<{body: CreatePostRequest}>(),
    $ADD_POST_UPDATE: props<{
      body: CreatePostRequest;
      response: PostModel;
      receivedTime: number;
    }>(),
  },
});

export const POST_RESET_ACTIONS = createActionGroup({
  source: 'POST',
  events: {
    $RESET_POST: emptyProps(),
  },
});
