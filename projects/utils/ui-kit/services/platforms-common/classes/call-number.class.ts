import { inject } from '@angular/core';

import { UkAlertService } from '../../alert/alert.service';
import type { PlatformType } from '../platforms-common.service';

export class UkCallNumber {
  private readonly alertService = inject(UkAlertService);

  public call(text: string, platform: PlatformType): void {
    if (platform === 'ANDROID') {
      this.androidCall(text);
    }

    if (platform === 'WEB') {
      this.webCall(text);
    }
  }

  private androidCall(number: string): void {
    try {
      window.Android?.callNumber(number);
    } catch (error) {
      this.alertService.error(
        `خطایی در تماس صوتی اندروید رخ داده, ${(error as Error)?.message}`,
      );
    }
  }

  private webCall(number: string): void {
    try {
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);

      if (isMobile) {
        window.open(`tel:${number}`, '_self');
      } else {
        this.alertService.error('مرورگر شما تماس صوتی را پشتیبانی نمیکند');
      }
    } catch (error) {
      const err = error as Error;

      this.alertService.error(`خطایی در تماس صوتی رخ داده: ${err.message}`);
    }
  }
}
