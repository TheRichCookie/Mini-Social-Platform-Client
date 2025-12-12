import {inject} from '@angular/core';

import {UkAlertService} from '../../alert/alert.service';
import type {PlatformType} from '../platforms-common.service';

export class UkShare {
  private readonly alertService = inject(UkAlertService);

  public async shareText(text: string, platform: PlatformType): Promise<void> {
    if (platform === 'ANDROID') {
      await this.androidShareText(text);
    }

    if (platform === 'WEB') {
      await this.webShareText(text);
    }
  }

  public async shareImage(
    image: ArrayBuffer | string,
    type: string,
    platform: PlatformType,
  ): Promise<void> {
    if (platform === 'ANDROID') {
      await this.androidShareImage(image, type);
    }

    if (platform === 'WEB') {
      await this.webShareImage(image);
    }
  }

  private async androidShareText(url: string): Promise<void> {
    try {
      await window.Android?.shareText(url);
    } catch (error) {
      this.alertService.error(
        `خطایی در همرسانی اندروید رخ داده, ${(error as Error)?.message}`,
      );
    }
  }

  private async webShareText(
    url: string,
    title = '',
    text = '',
  ): Promise<void> {
    if (!navigator.share) {
      this.alertService.error('مرورگر شما از اشتراک گذاری پشتیبانی نمی کند');

      return;
    }

    try {
      await navigator.share({title, text, url});
    } catch (error) {
      const err = error as Error;

      // Check if the user canceled (error message varies across browsers)
      if (
        err.name === 'AbortError' || // Chrome / Safari may throw this
        err.message?.toLowerCase().includes('cancel') // fallback check for message
      ) {
        return;
      }

      this.alertService.error(`خطایی در همرسانی وب رخ داده: ${err.message}`);
    }
  }

  private async androidShareImage(
    image: ArrayBuffer | string,
    type: string,
  ): Promise<void> {
    try {
      const base64Only = (image as string).replace(
        /^data:image\/svg\+xml;base64,/,
        '',
      );

      await window.Android?.shareImage(base64Only, type);
    } catch (error) {
      this.alertService.error(
        `خطایی در همرسانی اندروید رخ داده, ${(error as Error)?.message}`,
      );
    }
  }

  private async webShareImage(image: ArrayBuffer | string): Promise<void> {
    const file = new File([image], 'shared-image.png', {type: 'png'});
    const fileArray = [file];

    if (!navigator.canShare?.({files: fileArray})) {
      this.alertService.error('مرورگر شما از اشتراک گذاری پشتیبانی نمی کند');

      return;
    }

    try {
      await navigator.share({
        title: 'Check out this image!',
        text: 'Sharing via Web Share API',
        files: [file],
      });
    } catch (error) {
      this.alertService.error(
        `خطایی در همرسانی وب رخ داده, ${(error as Error)?.message}`,
      );
    }
  }
}
