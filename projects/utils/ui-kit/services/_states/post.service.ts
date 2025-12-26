import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UkApiHeaderService } from '@utils/ui-kit/services';
import type { Observable } from 'rxjs';

import type { CreatePostRequest, CreatePostResponse, PostArrayResponse, CommonResponseViewModel } from '../../definitions/swagger/swagger';
import { UkConfigApiServices, UkConfigApiVersions } from '../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkPostService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public addPost(
    req: CreatePostRequest,
  ): Observable<CreatePostResponse> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = '';

    return this.httpClient.post<CreatePostResponse>(URI, BODY, { headers: HEADERS });
  }

  public getPosts(): Observable<PostArrayResponse> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = '';

    return this.httpClient.get<PostArrayResponse>(URI, {
      headers: HEADERS,
    });
  }

  public getUserPosts(
    userId: string,
  ): Observable<PostArrayResponse> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `user/${userId}`;

    return this.httpClient.get<PostArrayResponse>(URI, {
      headers: HEADERS,
    });
  }

  public deletePost(id: string): Observable<CommonResponseViewModel> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${id}`;

    return this.httpClient.delete<CommonResponseViewModel>(URI, {
      headers: HEADERS,
    });
  }
}
