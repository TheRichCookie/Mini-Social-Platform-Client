import {createActionGroup, props} from '@ngrx/store';
import type {
  OtpRequestModel,
  OtpResponseModel,
  SignInRequestViewModel,
  SignInResponseViewModel,
  SignUpRequestViewModel,
  SignUpResponseViewModel,
} from '@utils/ui-kit/definitions';

// Sign In
export const SIGN_IN_ACTIONS = createActionGroup({
  source: 'AUTH',
  events: {
    $SIGN_IN_POST: props<{request: SignInRequestViewModel}>(),
    $SIGN_IN_UPDATE: props<{
      request: SignInRequestViewModel;
      response: SignInResponseViewModel;
      receivedTime: number;
    }>(),
  },
});

// Sign Up
export const SIGN_UP_ACTIONS = createActionGroup({
  source: 'AUTH',
  events: {
    $SIGN_UP_POST: props<{request: SignUpRequestViewModel}>(),
    $SIGN_UP_UPDATE: props<{
      request: SignUpRequestViewModel;
      response: SignUpResponseViewModel;
      receivedTime: number;
    }>(),
  },
});

// OTP
export const OTP_ACTIONS = createActionGroup({
  source: 'AUTH',
  events: {
    $OTP_POST: props<{request: OtpRequestModel}>(),
    $OTP_UPDATE: props<{
      request: OtpRequestModel;
      response: OtpResponseModel;
      receivedTime: number;
    }>(),
  },
});
