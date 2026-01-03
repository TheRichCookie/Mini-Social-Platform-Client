import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  SearchUsersDataModel,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkUserService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public searchUsers(query: {
    q?: string;
    page: number;
    limit: number;
  }): Observable<CommonResponseViewModel<SearchUsersDataModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.USERS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    let params = new HttpParams();

    if (query) {
      params = params.set('page', query?.page);
      params = params.set('limit', query?.limit);

      if (query.q) {
        params = params.set('q', query?.q);
      }
    }

    const URI = '/search';

    return this.httpClient.get<CommonResponseViewModel<SearchUsersDataModel>>(
      URI,
      {
        headers: HEADERS,
        params,
      },
    );
  }
}
