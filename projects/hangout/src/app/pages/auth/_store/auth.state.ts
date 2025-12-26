import type {
  AuthOtpVerificationRequest,
  AuthSignInRequest,
  AuthSignUpRequest,
  OtpVerificationDataModel,
  SignInDataModel,
  SignUpDataModel,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangAuthState {
  signIn: {
    request: AuthSignInRequest;
    response: SignInDataModel;
    receivedTime: number;
    error: {
      receivedTime: number;
      message: string;
    };
  };
  signUp: {
    request: AuthSignUpRequest;
    response: SignUpDataModel;
    receivedTime: number;
    error: {
      receivedTime: number;
      message: string;
    };
  };
  otp: {
    request: AuthOtpVerificationRequest;
    response: OtpVerificationDataModel;
    receivedTime: number;
    error: {
      receivedTime: number;
      message: string;
    };
  };
}
