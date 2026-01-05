import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  HasUnreadNotificationsData,
  NotificationPaginationData,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkNotificationService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getNotifications(query?: {
    page: number;
    limit: number;
  }): Observable<CommonResponseViewModel<NotificationPaginationData>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.NOTIFICATIONS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    let params = new HttpParams();

    if (query) {
      params = params.set('page', query?.page);
      params = params.set('limit', query?.limit);
    }

    const URI = '';

    return this.httpClient.get<
      CommonResponseViewModel<NotificationPaginationData>
    >(URI, {
      params,
      headers: HEADERS,
    });
  }

  public markAsRead(id: string): Observable<CommonResponseViewModel<void>> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.NOTIFICATIONS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const BODY = {};
    const URI = `/${id}/read`;

    return this.httpClient.put<CommonResponseViewModel<void>>(URI, BODY, {
      headers: HEADERS,
    });
  }

  public getHasUnread(): Observable<
    CommonResponseViewModel<HasUnreadNotificationsData>
  > {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.NOTIFICATIONS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    const URI = 'hasUnread';

    return this.httpClient.get<
      CommonResponseViewModel<HasUnreadNotificationsData>
    >(URI, {
      headers: HEADERS,
    });
  }
}
