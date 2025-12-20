import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import type {UkResponse} from '../../definitions';
import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkLikeService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getLikes(
    postId: string,
  ): Observable<UkResponse<GetLikesResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.LIKES,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${postId}`;

    return this.httpClient.get<UkResponse<GetLikesResponseViewModel>>(URI, {
      headers: HEADERS,
    });
  }

  public toggleLike(
    postId: string,
  ): Observable<UkResponse<ToggleLikeResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.LIKES,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${postId}`;

    return this.httpClient.post<UkResponse<ToggleLikeResponseViewModel>>(
      URI,
      {},
      {
        headers: HEADERS,
      },
    );
  }
}
