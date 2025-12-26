/* eslint-disable no-console */
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import type { UkAppConfiguration } from '@utils/ui-kit/definitions';
import {
  UkAppDirection,
  UkAppTheme,
  UkAppZoom,
  UkBooleanType,
  UkDateType,
  UkLanguageCode,
  UkLanguageLocale,
  UkLanguageName,
} from '@utils/ui-kit/definitions';
import { NgxLoggerLevel } from 'ngx-logger';
import type { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

import { UkLoggerService } from '../../logger/logger.service';
import { UkAppInfoService } from '../app-info/app-info.service';
import { UkAppSoundEffectService } from '../app-sound-effect/app-sound-effect.service';

@Injectable({
  providedIn: 'root',
})
export class UkAppInitService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly loggerService = inject(UkLoggerService);
  private readonly appInfoService = inject(UkAppInfoService);
  private readonly appSoundEffectService = inject(UkAppSoundEffectService);

  private readonly appReadySubject$ = new ReplaySubject<void>(1);

  public get appReady$(): Observable<void> {
    return this.appReadySubject$.asObservable();
  }

  public async initApp(): Promise<UkAppConfiguration> {
    const APP_CONFIGURATION: UkAppConfiguration = {
      userConfiguration: {
        language: {
          id: 1,
          name: UkLanguageName.FARSI,
          languageCode: UkLanguageCode.FA,
          languageLocale: UkLanguageLocale.IR,
          phonePrefix: '98',
          flagUrl: '',
          direction: UkAppDirection.RTL,
          dateType: UkDateType.JALALI,
        },
        ui: {
          appTheme: UkAppTheme.LIGHT,
          appZoom: UkAppZoom.MEDIUM,
          baseColor: '',
          accentColor: '',
          warnColor: '',
          bgColor: '',
          fgColor: '',
        },
        settings: {
          isWalkThroughSeen: false,
        },
      },
      generalConfiguration: {
        languages: [
          {
            id: 1,
            name: UkLanguageName.FARSI,
            languageCode: UkLanguageCode.FA,
            languageLocale: UkLanguageLocale.IR,
            phonePrefix: '98',
            flagUrl: '',
            direction: UkAppDirection.RTL,
            dateType: UkDateType.JALALI,
          },
        ],
      },
    };

    return Promise.resolve(APP_CONFIGURATION);
  }

  public async appPreparation(): Promise<boolean> {
    this.loggerService.init(NgxLoggerLevel.DEBUG);
    this.appSoundEffectService.init(UkBooleanType.TRUE);
    this.appInfoService.init();

    return Promise.resolve(true);
  }

  public async printLogo(): Promise<boolean> {
    const logo = ukGetLogo();

    if (isPlatformBrowser(this.platformId)) {
      console.log(logo);
      console.log('app initialized successfully 🚀');
    }

    return Promise.resolve(true);
  }
}

export function ukGetLogo(): string {
  const logo = '';

  // logo += '                                               \n';
  // logo += '---------------------------------------------- \n';
  // logo += ' ██████   █████  ███    ███  █████  ███    ██  \n';
  // logo += ' ██   ██ ██   ██ ████  ████ ██   ██ ████   ██  \n';
  // logo += ' ██████  ███████ ██ ████ ██ ███████ ██ ██  ██  \n';
  // logo += ' ██   ██ ██   ██ ██  ██  ██ ██   ██ ██  ██ ██  \n';
  // logo += ' ██████  ██   ██ ██      ██ ██   ██ ██   ████  \n';
  // logo += '                                               \n';
  // logo += ' TEL: +98 21 910 04055                         \n';
  // logo += ' ADDRESS: No.60, Behrami Street, Between       \n';
  // logo += '          Jordan and Vali-e-Asr, Tehran, Iran. \n';
  // logo += ' WEB: https://web.baman.club/                  \n';
  // logo += '---------------------------------------------- \n';
  // logo += '                                               \n';

  return logo;
}
