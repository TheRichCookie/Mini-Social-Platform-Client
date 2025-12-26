import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  CreatePostRequest,
  PostModel,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkPostService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public addPost(
    req: CreatePostRequest,
  ): Observable<CommonResponseViewModel<PostModel>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const BODY = req;
    const URI = '';

    return this.httpClient.post<CommonResponseViewModel<PostModel>>(URI, BODY, {
      headers: HEADERS,
    });
  }

  public getPosts(): Observable<CommonResponseViewModel<PostModel[]>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = '';

    return this.httpClient.get<CommonResponseViewModel<PostModel[]>>(URI, {
      headers: HEADERS,
    });
  }

  public getUserPosts(
    userId: string,
  ): Observable<CommonResponseViewModel<PostModel[]>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `user/${userId}`;

    return this.httpClient.get<CommonResponseViewModel<PostModel[]>>(URI, {
      headers: HEADERS,
    });
  }

  public deletePost(id: string): Observable<CommonResponseViewModel<void>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.POSTS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = `/${id}`;

    return this.httpClient.delete<CommonResponseViewModel<void>>(URI, {
      headers: HEADERS,
    });
  }
}
