import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import type {
  OtpRequestModel,
  OtpResponseModel,
  SignInRequestViewModel,
  SignInResponseViewModel,
  SignUpRequestViewModel,
  SignUpResponseViewModel,
  UkResponse,
} from '../../definitions';
import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkAuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public signIn(
    req: SignInRequestViewModel,
  ): Observable<UkResponse<SignInResponseViewModel>> {
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

    return this.httpClient.post<UkResponse<SignInResponseViewModel>>(
      URI,
      BODY,
      {
        headers: NEW_HEADERS,
      },
    );
  }

  public signUp(
    req: SignUpRequestViewModel,
  ): Observable<UkResponse<SignUpResponseViewModel>> {
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

    return this.httpClient.post<UkResponse<SignUpResponseViewModel>>(
      URI,
      BODY,
      {
        headers: NEW_HEADERS,
      },
    );
  }

  public otp(req: OtpRequestModel): Observable<UkResponse<OtpResponseModel>> {
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

    return this.httpClient.post<UkResponse<OtpResponseModel>>(URI, BODY, {
      headers: NEW_HEADERS,
    });
  }
}
