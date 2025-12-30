import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  PostModel,
  UpdateProfileRequest,
  UserModel,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkProfileService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getProfile(
    userId: string,
  ): Observable<CommonResponseViewModel<UserModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${userId}`;

    return this.httpClient.get<CommonResponseViewModel<UserModel>>(URI, {
      headers: HEADERS,
    });
  }

  public getUserProfilePosts(
    userId: string,
    query?: {
      page: number;
      limit: number;
    },
  ): Observable<CommonResponseViewModel<PostModel[]>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    let params = new HttpParams();

    if (query) {
      params = params.set('page', query?.page);
      params = params.set('limit', query?.limit);
    }

    const URI = `/${userId}/posts`;

    return this.httpClient.get<CommonResponseViewModel<PostModel[]>>(URI, {
      params,
      headers: HEADERS,
    });
  }

  public updateProfile(
    req: UpdateProfileRequest,
  ): Observable<CommonResponseViewModel<UserModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = '';

    return this.httpClient.patch<CommonResponseViewModel<UserModel>>(
      URI,
      BODY,
      {
        headers: HEADERS,
      },
    );
  }
}
