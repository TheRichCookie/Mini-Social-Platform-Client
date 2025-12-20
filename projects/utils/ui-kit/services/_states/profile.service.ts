import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import type {UkResponse} from '../../definitions';
import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkProfileService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getProfile(
    userId: string,
  ): Observable<UkResponse<GetProfileResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${userId}`;

    return this.httpClient.get<UkResponse<GetProfileResponseViewModel>>(URI, {
      headers: HEADERS,
    });
  }

  public getUserProfilePosts(
    userId: string,
  ): Observable<UkResponse<GetUserProfilePostsResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${userId}/posts`;

    return this.httpClient.get<
      UkResponse<GetUserProfilePostsResponseViewModel>
    >(URI, {
      headers: HEADERS,
    });
  }

  public updateProfile(
    req: UpdateProfileRequestViewModel,
  ): Observable<UkResponse<UpdateProfileResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = '';

    return this.httpClient.patch<UkResponse<UpdateProfileResponseViewModel>>(
      URI,
      BODY,
      {
        headers: HEADERS,
      },
    );
  }
}
