import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  LikesCountResponse,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkLikeService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getLikes(
    postId: string,
  ): Observable<CommonResponseViewModel<LikesCountResponse>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.LIKES,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const URI = `/${postId}`;

    return this.httpClient.get<CommonResponseViewModel<LikesCountResponse>>(
      URI,
      {
        headers: HEADERS,
      },
    );
  }

  public toggleLike(postId: string): Observable<CommonResponseViewModel<void>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.LIKES,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const BODY = {};
    const URI = `/${postId}`;

    return this.httpClient.post<CommonResponseViewModel<void>>(URI, BODY, {
      headers: HEADERS,
    });
  }
}
