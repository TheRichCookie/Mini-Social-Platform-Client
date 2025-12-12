import {inject, Injectable} from '@angular/core';

import {UkAlertService} from '../../alert/alert.service';
import type {PlatformType} from '../platforms-common.service';

@Injectable()
export class UkDeepLink {
  private readonly alertService = inject(UkAlertService);

  public async openUrl(url: string, platform: PlatformType): Promise<void> {
    if (platform === 'ANDROID') {
      await this.androidOpenUrl(url);
    }

    if (platform === 'WEB') {
      this.webOpenUrl(url);
    }
  }

  private async androidOpenUrl(url: string): Promise<void> {
    try {
      await window.Android?.openUrlInBrowser(url);
    } catch (error) {
      this.alertService.error(
        `خطایی در نمایش لینک اندروید رخ داده, ${(error as Error)?.message}`,
      );
    }
  }

  private webOpenUrl(url: string): void {
    try {
      window.location.href = url;
    } catch (err: unknown) {
      this.alertService.error(
        `خطایی در کپی متن وب رخ داده, ${(err as Error).message}`,
      );
    }
  }
}
