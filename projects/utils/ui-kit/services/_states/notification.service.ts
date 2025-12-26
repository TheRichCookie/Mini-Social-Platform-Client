import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  NotificationModel,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkNotificationService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getNotifications(): Observable<
    CommonResponseViewModel<NotificationModel[]>
  > {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.NOTIFICATIONS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const URI = '';

    return this.httpClient.get<CommonResponseViewModel<NotificationModel[]>>(
      URI,
      {
        headers: HEADERS,
      },
    );
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
}
