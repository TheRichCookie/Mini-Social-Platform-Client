import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import type {
  AddCommentRequest,
  CommentModel,
} from '@utils/ui-kit/definitions/swagger/comment.dto';
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

  public getPostComments(postId: number): Observable<UkResponse<CommentModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.COMMENTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${postId}`;

    return this.httpClient.get<UkResponse<CommentModel>>(URI, {
      headers: HEADERS,
    });
  }

  public addComment(
    postId: number,
    body: AddCommentRequest,
  ): Observable<UkResponse<CommentModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.COMMENTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const BODY = body;
    const URI = `/${postId}`;

    return this.httpClient.post<UkResponse<CommentModel>>(URI, BODY, {
      headers: HEADERS,
    });
  }

  public deleteComment(
    commentId: number,
  ): Observable<UkResponse<CommentModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.COMMENTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const URI = `/${commentId}`;

    return this.httpClient.delete<UkResponse<CommentModel>>(URI, {
      headers: HEADERS,
    });
  }
}
