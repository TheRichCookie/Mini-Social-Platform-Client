import {inject} from '@angular/core';

import {UkAlertService} from '../../alert/alert.service';
import type {PlatformType} from '../platforms-common.service';

export class UkLocation {
  private readonly alertService = inject(UkAlertService);

  public async getLocation(
    platform: PlatformType,
  ): Promise<GeolocationPosition | string | null> {
    if (platform === 'ANDROID') {
      return this.androidGetLocation();
    }

    if (platform === 'WEB') {
      return this.webGetLocation();
    }

    return null;
  }

  private async androidGetLocation(): Promise<string> {
    try {
      return (await window.Android?.getLocation?.()) ?? 'Unavailable';
    } catch (error) {
      this.alertService.error(
        `خطایی در همرسانی اندروید رخ داده, ${(error as Error)?.message}`,
      );

      return 'Unavailable';
    }
  }

  private async webGetLocation(): Promise<GeolocationPosition | null> {
    if (!navigator.geolocation) {
      this.alertService.error('مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند');

      return null;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          let message = '';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'دسترسی به موقعیت مکانی رد شد';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'موقعیت مکانی در دسترس نیست';
              break;
            case error.TIMEOUT:
              message = 'درخواست موقعیت مکانی زمان‌بر شد';
              break;
            default:
              message = 'خطای نامشخص در دریافت موقعیت مکانی';
          }

          this.alertService.error(message);
          resolve(null);
        },
      );
    });
  }
}
