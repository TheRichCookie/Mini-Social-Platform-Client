import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  AuthOtpVerificationRequest,
  AuthSignInRequest,
  AuthSignUpRequest,
  CommonResponseViewModel,
  OtpVerificationResponse,
  SignInResponse,
  SignUpResponse,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkAuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public signIn(
    req: AuthSignInRequest,
  ): Observable<CommonResponseViewModel<SignInResponse>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.AUTH,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = 'signIn';

    const NEW_HEADERS = HEADERS.set('authorization', 'Bearer').set(
      'X-Skip-On-Authenticating',
      'true',
    );

    return this.httpClient.post<CommonResponseViewModel<SignInResponse>>(
      URI,
      BODY,
      {
        headers: NEW_HEADERS,
      },
    );
  }

  public signUp(
    req: AuthSignUpRequest,
  ): Observable<CommonResponseViewModel<SignUpResponse>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.AUTH,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = 'signUp';

    const NEW_HEADERS = HEADERS.set('authorization', 'Bearer').set(
      'X-Skip-On-Authenticating',
      'true',
    );

    return this.httpClient.post<CommonResponseViewModel<SignUpResponse>>(
      URI,
      BODY,
      {
        headers: NEW_HEADERS,
      },
    );
  }

  public otp(
    req: AuthOtpVerificationRequest,
  ): Observable<CommonResponseViewModel<OtpVerificationResponse>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.AUTH,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = 'otpVerification';

    const NEW_HEADERS = HEADERS.set('authorization', 'Bearer').set(
      'X-Skip-On-Authenticating',
      'true',
    );

    return this.httpClient.post<
      CommonResponseViewModel<OtpVerificationResponse>
    >(URI, BODY, {
      headers: NEW_HEADERS,
    });
  }
}
