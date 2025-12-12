import {inject, Injectable} from '@angular/core';

import {UkAlertService} from '../../alert/alert.service';
import type {PlatformType} from '../platforms-common.service';

@Injectable()
export class UkClipboard {
  private readonly alertService = inject(UkAlertService);

  public async setClipboard(
    text: string,
    platform: PlatformType,
  ): Promise<void> {
    if (platform === 'ANDROID') {
      await this.androidSetClipboard(text);
    }

    if (platform === 'WEB') {
      await this.webSetClipboard(text);
    }
  }

  private async androidSetClipboard(text: string): Promise<void> {
    try {
      await window.Android?.setClipboard(text, '');
    } catch (error) {
      this.alertService.error(
        `خطایی در کپی متن اندروید رخ داده, ${(error as Error)?.message}`,
      );
    }
  }

  private async webSetClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.alertService.success('لینک کپی گردید');
    } catch (err: unknown) {
      this.alertService.error(
        `خطایی در کپی متن وب رخ داده, ${(err as Error).message}`,
      );
    }
  }
}
