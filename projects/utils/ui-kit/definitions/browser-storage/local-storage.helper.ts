import type { UkStorage } from './storage.interface';

export class UkLocalStoring implements UkStorage {
  public get(key: string, defaultValue: string | null = null): string | null {
    const OBJ_STRING = localStorage.getItem(key);

    if (OBJ_STRING) {
      let parsedObj;

      try {
        parsedObj = JSON.parse(OBJ_STRING);
      } catch (e) {
        // Not block app if not parsable
        console.error(e);
        this.clear(key);
      }

      return parsedObj;
    }

    return defaultValue;
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public clear(key: string): void {
    localStorage.removeItem(key);
  }
}
