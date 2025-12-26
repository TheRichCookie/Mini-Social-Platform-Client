import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  AddCommentRequest,
  CommentModel,
  CommonResponseViewModel,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkCommentService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getPostComments(
    postId: string,
  ): Observable<CommonResponseViewModel<CommentModel[]>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.COMMENTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${postId}`;

    return this.httpClient.get<CommonResponseViewModel<CommentModel[]>>(URI, {
      headers: HEADERS,
    });
  }

  public addComment(
    postId: string,
    body: AddCommentRequest,
  ): Observable<CommonResponseViewModel<CommentModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.COMMENTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const BODY = body;
    const URI = `/${postId}`;

    return this.httpClient.post<CommonResponseViewModel<CommentModel>>(
      URI,
      BODY,
      {
        headers: HEADERS,
      },
    );
  }

  public deleteComment(
    commentId: string,
  ): Observable<CommonResponseViewModel<void>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.COMMENTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const URI = `/${commentId}`;

    return this.httpClient.delete<CommonResponseViewModel<void>>(URI, {
      headers: HEADERS,
    });
  }
}
