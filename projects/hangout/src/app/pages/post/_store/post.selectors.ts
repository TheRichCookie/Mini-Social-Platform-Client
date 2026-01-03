import type {HangBaseState} from '@app/shared/store/_base/_base.state';
import {createSelector} from '@ngrx/store';

import type {HangPostState} from './post.state';

export const POST_STATE = (state: HangBaseState): HangPostState => state.post;

export const SELECT_ADD_POST_RES = createSelector(
  POST_STATE,
  (s) => s.post.response,
);
