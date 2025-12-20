import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import type {UkResponse} from '../../definitions';
import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkPostService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public addPost(
    req: AddPostRequestViewModel,
  ): Observable<UkResponse<AddPostResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = '';

    return this.httpClient.post<UkResponse<AddPostResponseViewModel>>(
      URI,
      BODY,
      {
        headers: HEADERS,
      },
    );
  }

  public getPosts(): Observable<UkResponse<GetPostsResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = '';

    return this.httpClient.get<UkResponse<GetPostsResponseViewModel>>(URI, {
      headers: HEADERS,
    });
  }

  public getUserPosts(
    userId: string,
  ): Observable<UkResponse<GetUserPostsResponseViewModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `user/${userId}`;

    return this.httpClient.get<UkResponse<GetUserPostsResponseViewModel>>(URI, {
      headers: HEADERS,
    });
  }

  public deletePost(id: string): Observable<UkResponse<void>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `user/${id}`;

    return this.httpClient.delete<UkResponse<void>>(URI, {
      headers: HEADERS,
    });
  }
}
