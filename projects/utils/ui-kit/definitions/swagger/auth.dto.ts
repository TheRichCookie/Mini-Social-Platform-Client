// Sign In
export interface SignInRequestViewModel {
  email: string;
  password: string;
}
export interface SignInResponseViewModel {
  userId: string;
}

// Sign Up
export interface SignUpRequestViewModel {
  username: string;
  email: string;
  password: string;
}
export interface SignUpResponseViewModel {
  userId: string
}

// OTP
export interface OtpRequestModel {
  userId: string;
  otp: string;
}
export interface OtpResponseModel {
  token: string;
}

// Refresh
export interface TokenVerifyCommandResult {
  refreshToken: string | null;
  refreshTokenExpiration: number;
  accessToken: string | null;
  accessTokenExpiration: number;
  nextStep: number;
  newUser: boolean;
  userId: number;
}
export interface RefreshRequestViewModel {
  accessToken: string | null;
  refreshToken: string | null;
}
