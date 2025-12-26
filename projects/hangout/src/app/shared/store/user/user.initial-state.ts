import type { HangUserState } from './user.state';

const USER_DATA: HangUserState['userData'] = {
  receivedTime: undefined!,
  error: {
    receivedTime: undefined!,
    message: undefined!,
  },
};

export const USER_INITIAL_STATE: HangUserState = {
  userData: USER_DATA,
};
