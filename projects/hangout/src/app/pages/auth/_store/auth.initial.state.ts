import type { HangAuthState } from '@pages/auth/_store/auth.state';

export const SIGN_IN: HangAuthState['signIn'] = {
  request: { email: undefined!, password: undefined! },
  response: {
    userId: undefined!,
  },
  receivedTime: undefined!,
  error: {
    receivedTime: undefined!,
    message: undefined!,
  },
};

export const SIGN_UP: HangAuthState['signUp'] = {
  request: { username: undefined!, email: undefined!, password: undefined! },
  response: {
    userId: undefined!,
  },
  receivedTime: undefined!,
  error: {
    receivedTime: undefined!,
    message: undefined!,
  },
};

export const OTP: HangAuthState['otp'] = {
  request: { userId: undefined!, otp: undefined! },
  response: {
    token: undefined!,
  },
  receivedTime: undefined!,
  error: {
    receivedTime: undefined!,
    message: undefined!,
  },
};

export const AUTH_INITIAL_STATE: HangAuthState = {
  signIn: SIGN_IN,
  signUp: SIGN_UP,
  otp: OTP,
};
