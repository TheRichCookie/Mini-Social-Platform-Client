import {createSelector} from '@ngrx/store';
import type {HangAuthState} from '@pages/auth/_store/auth.state';
import type {HangBaseState} from '@store/_base/_base.state';

export const AUTH_STATE = (state: HangBaseState): HangAuthState => state.auth;

export const SELECT_AUTH_SIGN_IN_REQUEST = createSelector(
  AUTH_STATE,
  (authState: HangAuthState) => authState.signIn.request,
);
export const SELECT_AUTH_SIGN_IN_RESPONSE = createSelector(
  AUTH_STATE,
  (authState: HangAuthState) => authState.signIn.response,
);
export const SELECT_AUTH_SIGN_IN_RECEIVED_TIME_RESPONSE = createSelector(
  AUTH_STATE,
  (authState: HangAuthState) => authState.signIn.receivedTime,
);
//
export const SELECT_AUTH_SIGN_UP_REQUEST = createSelector(
  AUTH_STATE,
  (authState: HangAuthState) => authState.signUp.request,
);
export const SELECT_AUTH_SIGN_UP_RESPONSE = createSelector(
  AUTH_STATE,
  (authState: HangAuthState) => authState.signUp.response,
);
export const SELECT_AUTH_SIGN_UP_RECEIVED_TIME_RESPONSE = createSelector(
  AUTH_STATE,
  (authState: HangAuthState) => authState.signUp.receivedTime,
);
//
export const SELECT_AUTH_OTP_REQUEST = createSelector(
  AUTH_STATE,
  (authState: HangAuthState) => authState.otp.request,
);
export const SELECT_AUTH_OTP_RESPONSE = createSelector(
  AUTH_STATE,
  (authState: HangAuthState) => authState.otp.response,
);
