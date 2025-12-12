import {Injectable} from '@angular/core';
import type {UkStorage, UkStoringProperty} from '@utils/ui-kit/definitions';
import {UkLocalStoring, UkTempStoring} from '@utils/ui-kit/definitions';

@Injectable({
  providedIn: 'root',
})
export class UkBrowserStorageService implements UkStorage {
  private readonly storage: UkStorage;

  constructor() {
    if (typeof Storage === 'undefined') {
      // If browser doesn't support storage.
      console.warn(
        'Storage in Your Browser not supported or you turned them off, ' +
          'Storage Service will use a fallback strategy instead',
      );
      this.storage = new UkTempStoring(); // Use TempStorage as a backup plan.
    } else {
      this.storage = new UkLocalStoring(); // Use regular local storage.
    }
  }

  public get(
    key: UkStoringProperty,
    defaultValue: string | null = null,
  ): string | null {
    return this.storage.get(key, defaultValue);
  }

  public set(key: UkStoringProperty, value: string): void {
    this.storage.set(key, value);
  }

  public clear(key: UkStoringProperty): void {
    this.storage.clear(key);
  }
}
