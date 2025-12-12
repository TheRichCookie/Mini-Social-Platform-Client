import {createAction, props} from '@ngrx/store';
import type {
  OtpRequestModel,
  OtpResponseModel,
  SignInRequestViewModel,
  SignInResponseViewModel,
  SignUpRequestViewModel,
  SignUpResponseViewModel,
} from '@utils/ui-kit/definitions';

// Sign In
export const POST_SIGN_IN_AUTH = createAction(
  '[AUTH] POST_SIGN_IN_AUTH',
  props<{
    request: SignInRequestViewModel;
  }>(),
);
export const UPDATE_SIGN_IN_AUTH = createAction(
  '[AUTH] UPDATE_SIGN_IN_AUTH',
  props<{
    request: SignInRequestViewModel;
    response: SignInResponseViewModel;
    receivedTime: number;
  }>(),
);

// Sign Up
export const POST_SIGN_UP_AUTH = createAction(
  '[AUTH] POST_SIGN_UP_AUTH',
  props<{
    request: SignUpRequestViewModel;
  }>(),
);
export const UPDATE_SIGN_UP_AUTH = createAction(
  '[AUTH] UPDATE_SIGN_UP_AUTH',
  props<{
    request: SignUpRequestViewModel;
    response: SignUpResponseViewModel;
    receivedTime: number;
  }>(),
);

// OTP
export const POST_OTP_AUTH = createAction(
  '[AUTH] POST_OTP_AUTH',
  props<{
    request: OtpRequestModel;
  }>(),
);
export const UPDATE_OTP_AUTH = createAction(
  '[AUTH] UPDATE_OTP_AUTH',
  props<{
    request: OtpRequestModel;
    response: OtpResponseModel;
    receivedTime: number;
  }>(),
);
