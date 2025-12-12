import {DOCUMENT} from '@angular/common';
import {inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import type {UkLanguage} from '../../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkAppLanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly appThemeSubject = new Subject<UkLanguage>();
  private language: UkLanguage = null!;

  public init(language: UkLanguage): void {
    this.setLanguage(language);
  }

  public setLanguage(language: UkLanguage): void {
    this.language = language;
    this.clearLanguage();
    this.prepareLanguage(language);
  }

  private clearLanguage(): void {
    this.document.body.classList.remove('app-LTR');
    this.document.body.classList.remove('app-RTL');
  }

  private prepareLanguage(language: UkLanguage): void {
    this.document.body.classList.add(`app-${language.direction}`);
    this.document.dir = language.direction;
    this.document.documentElement.lang = language.languageCode;
  }
}
