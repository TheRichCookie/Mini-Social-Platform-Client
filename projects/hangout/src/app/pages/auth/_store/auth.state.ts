import type {
  OtpRequestModel,
  OtpResponseModel,
  SignInRequestViewModel,
  SignInResponseViewModel,
  SignUpRequestViewModel,
  SignUpResponseViewModel,
} from '@utils/ui-kit/definitions';

export interface HangAuthState {
  signIn: {
    request: SignInRequestViewModel;
    response: SignInResponseViewModel;
    receivedTime: number;
    error: {
      receivedTime: number;
      message: string;
    };
  };
  signUp: {
    request: SignUpRequestViewModel;
    response: SignUpResponseViewModel;
    receivedTime: number;
    error: {
      receivedTime: number;
      message: string;
    };
  };
  otp: {
    request: OtpRequestModel;
    response: OtpResponseModel;
    receivedTime: number;
    error: {
      receivedTime: number;
      message: string;
    };
  };
}
