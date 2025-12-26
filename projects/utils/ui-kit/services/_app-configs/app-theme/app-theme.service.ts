import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum UkAppTheme {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

@Injectable({
  providedIn: 'root',
})
export class UkAppThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly appThemeSubject = new Subject<UkAppTheme>();
  private appTheme: UkAppTheme = null!;

  public init(appTheme: UkAppTheme): void {
    this.appTheme = appTheme;

    if (appTheme === UkAppTheme.DARK) {
      this.document.body.classList.remove('app-theme-LIGHT');
      this.document.body.classList.add('app-theme-DARK');
    }

    if (appTheme === UkAppTheme.LIGHT) {
      this.document.body.classList.remove('app-theme-DARK');
      this.document.body.classList.add('app-theme-LIGHT');
    }

    this.appThemeSubject.next(appTheme);
  }

  public changeThemeToDark(): void {
    this.document.body.classList.remove('app-theme-LIGHT');
    this.document.body.classList.add('app-theme-DARK');

    this.appThemeSubject.next(this.appTheme);
  }

  public changeThemeToLight(): void {
    this.document.body.classList.remove('app-theme-DARK');
    this.document.body.classList.add('app-theme-LIGHT');

    this.appThemeSubject.next(this.appTheme);
  }
}
