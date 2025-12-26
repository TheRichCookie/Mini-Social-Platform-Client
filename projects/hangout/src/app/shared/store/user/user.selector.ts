import type { HangBaseState } from '../_base/_base.state';
import type { HangUserState } from './user.state';

export const USER_STATE = (state: HangBaseState): HangUserState => state.user;
