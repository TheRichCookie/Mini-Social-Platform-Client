import {inject, Injectable} from '@angular/core';

import {UkAlertService} from '../alert/alert.service';
import {UkCallNumber} from './classes/call-number.class';
import {UkClipboard} from './classes/clipboard.class';
import {UkDeepLink} from './classes/deep-link.class';
import {UkLocation} from './classes/location.class';
import {UkShare} from './classes/share.class';

declare global {
  interface Window {
    Android?: {
      isAndroidApp: unknown;
      shareImage: (base64Only: string, type: string) => void;
      setClipboard: (text: string, queryParams: string) => void;
      shareText: (url: string) => void;
      openUrlInBrowser: (url: string) => void;
      callNumber: (number: string) => void;
      getLocation: () => void;
    };
  }
}

export type PlatformType = 'ANDROID' | 'IPHONE' | 'WEB';

@Injectable({
  providedIn: 'root',
})
export class UkPlatformsCommonService {
  private readonly alertService = inject(UkAlertService);

  private readonly share = new UkShare();
  private readonly clipboard = new UkClipboard();
  private readonly deepLink = new UkDeepLink();
  private readonly location = new UkLocation();
  private readonly callNumber = new UkCallNumber();

  public getPlatform(): PlatformType {
    if (
      typeof window.Android?.isAndroidApp === 'function' &&
      window.Android.isAndroidApp()
    ) {
      return 'ANDROID';
    }

    return 'WEB';
  }

  public async getLocation(): Promise<GeolocationPosition | string | null> {
    const platform = this.getPlatform();

    return this.location.getLocation(platform);
  }

  public calling(number: string): void {
    const platform = this.getPlatform();

    return this.callNumber.call(number, platform);
  }

  public async shareText(text: string): Promise<void> {
    const platform = this.getPlatform();

    await this.share.shareText(text, platform);
  }

  public async shareImage(
    image: ArrayBuffer | string,
    type: string,
  ): Promise<void> {
    const platform = this.getPlatform();

    await this.share.shareImage(image, type, platform);
  }

  public async setClipboard(text: string): Promise<void> {
    const platform = this.getPlatform();

    await this.clipboard.setClipboard(text, platform);
  }

  public async openUrl(url: string): Promise<void> {
    const platform = this.getPlatform();

    await this.deepLink.openUrl(url, platform);
  }
}
