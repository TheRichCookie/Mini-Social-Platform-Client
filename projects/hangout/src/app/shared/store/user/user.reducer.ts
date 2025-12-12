import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';

import {USER_INITIAL_STATE} from './user.initial-state';
import type {HangUserState} from './user.state';

const reducer = createReducer(USER_INITIAL_STATE);

export const userReducer: (
  state: HangUserState | undefined,
  action: Action,
) => HangUserState = reducer;
