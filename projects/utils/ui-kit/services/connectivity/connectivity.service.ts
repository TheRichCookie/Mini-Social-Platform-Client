import { inject, Injectable, NgZone } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { UkLoggerPart, UkLoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class UkConnectivityService {
  private readonly ngZone = inject(NgZone);
  private readonly loggerService = inject(UkLoggerService);

  private readonly onlineStatus: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    window.addEventListener('online', () => this.updateStatus(true));
    window.addEventListener('offline', () => this.updateStatus(false));
  }

  public getOnlineStatus(): Observable<boolean> {
    return this.onlineStatus.asObservable();
  }

  private updateStatus(status: boolean): void {
    if (status) {
      this.loggerService.info(
        UkLoggerPart.CONNECTIVITY_SERVICE,
        'internet is connected',
        [Date.now],
      );
    } else {
      this.loggerService.error(
        UkLoggerPart.CONNECTIVITY_SERVICE,
        'internet is dis-connected',
        [Date.now],
      );
    }

    this.ngZone.run(() => {
      this.onlineStatus.next(status);
    });
  }
}
