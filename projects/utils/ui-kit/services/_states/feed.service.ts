import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  FeedPostModel,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkFeedService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getFeed(query?: {
    page: number;
    limit: number;
  }): Observable<CommonResponseViewModel<FeedPostModel[]>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.FEED,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    let params = new HttpParams();

    if (query) {
      params = params.set('page', query?.page);
      params = params.set('limit', query?.limit);
    }

    const URI = '';

    return this.httpClient.get<CommonResponseViewModel<FeedPostModel[]>>(URI, {
      headers: HEADERS,
      params: params,
    });
  }
}
