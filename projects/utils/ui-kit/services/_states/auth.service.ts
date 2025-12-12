import type {HttpResponse} from '@angular/common/http';
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
  ): Observable<HttpResponse<SignInResponseViewModel>> {
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

    return this.httpClient.post<SignInResponseViewModel>(URI, BODY, {
      headers: NEW_HEADERS,
      observe: 'response',
    });
  }

  public signUp(
    req: SignUpRequestViewModel,
  ): Observable<HttpResponse<SignUpResponseViewModel>> {
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

    return this.httpClient.post<SignUpResponseViewModel>(URI, BODY, {
      headers: NEW_HEADERS,
      observe: 'response',
    });
  }

  public otp(req: OtpRequestModel): Observable<HttpResponse<OtpResponseModel>> {
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

    return this.httpClient.post<OtpResponseModel>(URI, BODY, {
      headers: NEW_HEADERS,
      observe: 'response',
    });
  }
}
