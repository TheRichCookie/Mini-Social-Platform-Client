import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UkApiHeaderService} from '@utils/ui-kit/services';
import type {Observable} from 'rxjs';

import {UkConfigApiServices, UkConfigApiVersions} from '../../definitions';
import type {
  CommonResponseViewModel,
  NotificationArrayResponse,
} from '../../definitions/swagger/swagger';

@Injectable({
  providedIn: 'root',
})
export class UkNotificationService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getNotifications(): Observable<NotificationArrayResponse> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.PROFILE, // fallback
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });
    // The api-service interceptor will prefix the correct service when using UkConfigApiServices.NOTIFICATIONS
    const HEADERS_WITH_SERVICE = this.apiHeaderService.init({
      apiService: (UkConfigApiServices as any).NOTIFICATIONS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const URI = '';

    return this.httpClient.get<NotificationArrayResponse>(URI, {
      headers: HEADERS_WITH_SERVICE,
    });
  }

  public markAsRead(id: string): Observable<CommonResponseViewModel> {
    const HEADERS = this.apiHeaderService.init({
      apiService: (UkConfigApiServices as any).NOTIFICATIONS,
      apiHeaderVersion: UkConfigApiVersions.NONE,
    });

    const URI = `/${id}/read`;

    return this.httpClient.put<CommonResponseViewModel>(
      URI,
      {},
      {headers: HEADERS},
    );
  }
}
