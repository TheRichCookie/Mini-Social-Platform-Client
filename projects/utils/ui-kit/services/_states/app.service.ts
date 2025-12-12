import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {type Observable} from 'rxjs';

import type {UkWorldUtcTime} from '../../definitions';
import {UkConfigApiServices} from '../../definitions';
import {UkApiHeaderService} from '../../services/api-header/api-header.service';

@Injectable({
  providedIn: 'root',
})
export class UkAppService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiHeaderService = inject(UkApiHeaderService);

  public getCurrentUtcTime(): Observable<UkWorldUtcTime> {
    const HEADERS = this.apiHeaderService.init({
      apiService: UkConfigApiServices.APP,
    });
    const NEW_HEADERS = HEADERS.set('X-Skip-Base-URL', 'true')
      .set('X-Skip-Adding-Bearer', 'true')
      .set('X-Skip-Api-Service', 'true')
      .set('X-Skip-Client', 'true')
      .set('X-Skip-Error-Handler', 'true')
      .set('X-Skip-On-Authenticating', 'true');

    // const URI = 'https://timeapi.io/api/Time/current/zone?timeZone=Etc/UTC';
    // const URI =
    //   'https://tapi.samanplus.ir/cartable/q/customer/contract/749967125494241280';
    const URI = 'http://localhost:4000/api/currentTime';

    return this.httpClient.get<UkWorldUtcTime>(URI, {
      headers: NEW_HEADERS,
    });
  }
}
