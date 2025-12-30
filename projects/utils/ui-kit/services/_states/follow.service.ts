import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  PaginatedUsersData,
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

  public getFollowers(
    userId: string,
    query?: {
      page: number;
      limit: number;
    },
  ): Observable<CommonResponseViewModel<PaginatedUsersData>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.FOLLOW,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    let params = new HttpParams();

    if (query) {
      params = params.set('page', query?.page);
      params = params.set('limit', query?.limit);
    }

    const URI = `followers/${userId}`;

    return this.httpClient.get<CommonResponseViewModel<PaginatedUsersData>>(
      URI,
      {
        params,
        headers: HEADERS,
      },
    );
  }

  public getFollowing(
    userId: string,
    query?: {
      page: number;
      limit: number;
    },
  ): Observable<CommonResponseViewModel<PaginatedUsersData>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.FOLLOW,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    let params = new HttpParams();

    if (query) {
      params = params.set('page', query?.page);
      params = params.set('limit', query?.limit);
    }

    const URI = `following/${userId}`;

    return this.httpClient.get<CommonResponseViewModel<PaginatedUsersData>>(
      URI,
      {
        params,
        headers: HEADERS,
      },
    );
  }
}
