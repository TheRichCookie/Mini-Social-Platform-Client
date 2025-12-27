import {createActionGroup, emptyProps, props} from '@ngrx/store';

import type {
  AuthOtpVerificationRequest,
  AuthSignInRequest,
  AuthSignUpRequest,
  OtpVerificationDataModel,
  SignInDataModel,
  SignUpDataModel,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

// Sign In
export const SIGN_IN_ACTIONS = createActionGroup({
  source: 'AUTH',
  events: {
    $SIGN_IN_POST: props<{request: AuthSignInRequest}>(),
    $SIGN_IN_UPDATE: props<{
      request: AuthSignInRequest;
      response: SignInDataModel;
      receivedTime: number;
    }>(),
  },
});

// Sign Up
export const SIGN_UP_ACTIONS = createActionGroup({
  source: 'AUTH',
  events: {
    $SIGN_UP_POST: props<{request: AuthSignUpRequest}>(),
    $SIGN_UP_UPDATE: props<{
      request: AuthSignUpRequest;
      response: SignUpDataModel;
      receivedTime: number;
    }>(),
    $SIGN_UP_RESET: emptyProps(),
  },
});

// OTP
export const OTP_ACTIONS = createActionGroup({
  source: 'AUTH',
  events: {
    $OTP_POST: props<{request: AuthOtpVerificationRequest}>(),
    $OTP_UPDATE: props<{
      request: AuthOtpVerificationRequest;
      response: OtpVerificationDataModel;
      receivedTime: number;
    }>(),
  },
});
