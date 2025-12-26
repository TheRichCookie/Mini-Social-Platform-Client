import type {FormControl} from '@angular/forms';

export interface HangSignInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface HangSignUpForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface HangOtpForm {
  userId: FormControl<string>;
  otp: FormControl<string>;
}

export type HangAuthStatus = 'ACTIVE' | 'EMPTY' | 'ERROR';
