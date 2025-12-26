import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  CountResponse,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkFollowService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public toggleFollow(
    userId: string,
  ): Observable<CommonResponseViewModel<void>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.FOLLOW,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${userId}`;

    return this.httpClient.post<CommonResponseViewModel<void>>(URI, null, {
      headers: HEADERS,
    });
  }

  public getFollowDetail(
    userId: string,
  ): Observable<CommonResponseViewModel<CountResponse>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.FOLLOW,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${userId}`;

    return this.httpClient.get<CommonResponseViewModel<CountResponse>>(URI, {
      headers: HEADERS,
    });
  }

  public getFollowersCount(
    userId: string,
  ): Observable<CommonResponseViewModel<CountResponse>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.FOLLOW,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${userId}/followers`;

    return this.httpClient.get<CommonResponseViewModel<CountResponse>>(URI, {
      headers: HEADERS,
    });
  }

  public getFollowingCount(
    userId: string,
  ): Observable<CommonResponseViewModel<CountResponse>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.FOLLOW,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${userId}/following`;

    return this.httpClient.get<CommonResponseViewModel<CountResponse>>(URI, {
      headers: HEADERS,
    });
  }
}
