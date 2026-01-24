import type {Action} from '@ngrx/store';
import {createReducer} from '@ngrx/store';
import {AUTH_INITIAL_STATE} from '@pages/auth/_store/auth.initial.state';
import {immerOn} from 'ngrx-immer/store';

import * as AUTH_ACTIONS from './auth.actions';
import {AUTH_RESET_ACTIONS} from './auth.actions';
import type {HangAuthState} from './auth.state';

const reducer = createReducer(
  AUTH_INITIAL_STATE,

  immerOn(AUTH_ACTIONS.SIGN_IN_ACTIONS.$SIGN_IN_UPDATE, (state, props) => {
    state.signIn.request = props.request;
    state.signIn.response = props.response;
    state.signIn.receivedTime = props.receivedTime;
  }),

  immerOn(AUTH_ACTIONS.SIGN_UP_ACTIONS.$SIGN_UP_UPDATE, (state, props) => {
    state.signUp.request = props.request;
    state.signUp.response = props.response;
    state.signUp.receivedTime = props.receivedTime;
  }),

  immerOn(AUTH_ACTIONS.OTP_ACTIONS.$OTP_UPDATE, (state, props) => {
    state.otp.request = props.request;
    state.otp.response = props.response;
    state.otp.receivedTime = props.receivedTime;
  }),

  immerOn(AUTH_ACTIONS.SIGN_UP_ACTIONS.$SIGN_UP_RESET, (state) => {
    state.signUp = AUTH_INITIAL_STATE.signUp;
  }),

  // reset
  immerOn(AUTH_RESET_ACTIONS.$RESET_AUTH, () => AUTH_INITIAL_STATE),
);

export const authReducer: (
  state: HangAuthState | undefined,
  action: Action,
) => HangAuthState = reducer;
