import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import type {UkResponse} from '../../definitions';
import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkCommentService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getPostComments(
    postId: number,
  ): Observable<UkResponse<GetPostCommentsResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.COMMENTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${postId}`;

    return this.httpClient.get<UkResponse<GetPostCommentsResponseViewModel>>(
      URI,
      {
        headers: HEADERS,
      },
    );
  }

  public addComment(
    postId: number,
    req: AddCommentRequestViewModel,
  ): Observable<UkResponse<AddCommentResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.COMMENTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = `/${postId}`;

    return this.httpClient.post<UkResponse<AddCommentResponseViewModel>>(
      URI,
      BODY,
      {
        headers: HEADERS,
      },
    );
  }

  public deleteComment(
    postId: number,
    commentId: number,
  ): Observable<UkResponse<void>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.COMMENTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${postId}`;

    return this.httpClient.delete<UkResponse<void>>(URI, {
      headers: HEADERS,
    });
  }
}
