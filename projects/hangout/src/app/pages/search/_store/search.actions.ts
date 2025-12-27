import {createActionGroup, props} from '@ngrx/store';

import type {UserSearchModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export const SEARCH_ACTIONS = createActionGroup({
  source: 'SEARCH',
  events: {
    $GET_SEARCH_USERS_POST: props<{query: string}>(),
    $GET_SEARCH_USERS_UPDATE: props<{
      response: UserSearchModel[];
      receivedTime: number;
    }>(),
    $TOGGLE_FOLLOW_USER: props<{userId: string}>(),
  },
});
