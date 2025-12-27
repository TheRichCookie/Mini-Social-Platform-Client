import {createActionGroup, props} from '@ngrx/store';

import type {
  PostModel,
  UserModel,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export const PROFILE_ACTIONS = createActionGroup({
  source: 'PROFILE',
  events: {
    $GET_PROFILE_DETAIL: props<{userId: string}>(),
    $GET_PROFILE_DETAIL_UPDATE: props<{
      response: UserModel;
      receivedTime: number;
    }>(),

    $GET_PROFILE_POSTS: props<{userId: string}>(),
    $GET_PROFILE_POSTS_UPDATE: props<{
      response: PostModel[];
      receivedTime: number;
    }>(),

    $TOGGLE_FOLLOW_PROFILE: props<{userId: string}>(),
  },
});
