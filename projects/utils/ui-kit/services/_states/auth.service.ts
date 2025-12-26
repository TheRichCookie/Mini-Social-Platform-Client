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
  OtpVerificationDataModel,
  SignInDataModel,
  SignUpDataModel,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkAuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public signIn(
    req: AuthSignInRequest,
  ): Observable<CommonResponseViewModel<SignInDataModel>> {
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

    return this.httpClient.post<CommonResponseViewModel<SignInDataModel>>(
      URI,
      BODY,
      {
        headers: NEW_HEADERS,
      },
    );
  }

  public signUp(
    req: AuthSignUpRequest,
  ): Observable<CommonResponseViewModel<SignUpDataModel>> {
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

    return this.httpClient.post<CommonResponseViewModel<SignUpDataModel>>(
      URI,
      BODY,
      {
        headers: NEW_HEADERS,
      },
    );
  }

  public otp(
    req: AuthOtpVerificationRequest,
  ): Observable<CommonResponseViewModel<OtpVerificationDataModel>> {
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
      CommonResponseViewModel<OtpVerificationDataModel>
    >(URI, BODY, {
      headers: NEW_HEADERS,
    });
  }
}
