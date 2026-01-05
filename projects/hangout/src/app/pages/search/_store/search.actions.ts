import {createActionGroup, emptyProps, props} from '@ngrx/store';
import type {SearchUsersDataModel} from '@utils/ui-kit/definitions';

export const SEARCH_ACTIONS = createActionGroup({
  source: 'SEARCH',
  events: {
    $GET_SEARCH_USERS: props<{
      query: {
        q?: string;
        page: number;
        limit: number;
      };
    }>(),
    $GET_SEARCH_USERS_UPDATE: props<{
      query: {
        q?: string;
        page: number;
        limit: number;
      };
      response: SearchUsersDataModel;
      receivedTime: number;
    }>(),
  },
});

export const SEARCH_RESET_ACTIONS = createActionGroup({
  source: 'SEARCH',
  events: {
    $RESET_SEARCH: emptyProps(),
  },
});
