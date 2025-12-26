import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  FeedArrayResponse,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkFeedService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getFeed(
    page: number,
    limit: number,
  ): Observable<CommonResponseViewModel<FeedArrayResponse>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.FEED,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = '';

    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.httpClient.get<CommonResponseViewModel<FeedArrayResponse>>(
      URI,
      {
        headers: HEADERS,
        params: params,
      },
    );
  }
}
