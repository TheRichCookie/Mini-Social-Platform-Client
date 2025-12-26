import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import type {UserProfileResponse, UpdateProfileRequest, PostArrayResponse} from '../../definitions/swagger/swagger';
import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkProfileService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getProfile(
    userId: string,
  ): Observable<UserProfileResponse> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${userId}`;

    return this.httpClient.get<UserProfileResponse>(URI, {
      headers: HEADERS,
    });
  }

  public getUserProfilePosts(
    userId: string,
  ): Observable<PostArrayResponse> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${userId}/posts`;

    return this.httpClient.get<PostArrayResponse>(URI, {
      headers: HEADERS,
    });
  }

  public updateProfile(
    req: UpdateProfileRequest,
  ): Observable<UserProfileResponse> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = '';

    return this.httpClient.patch<UserProfileResponse>(URI, BODY, { headers: HEADERS });
  }
}
