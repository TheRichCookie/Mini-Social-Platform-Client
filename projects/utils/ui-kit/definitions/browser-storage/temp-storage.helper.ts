import type {UkStorage} from './storage.interface';

export class UkTempStoring implements UkStorage {
  private storage: Record<string, string> = {}; // Temporary Storage Class Field Memory.

  public get(key: string, defaultValue: string | null = null): string | null {
    const OBJ_STRING = this.storage[key];

    if (OBJ_STRING) {
      let parsedObj;

      try {
        parsedObj = JSON.parse(OBJ_STRING);
      } catch {
        // Not block app if not parsable
        this.clear(key);
      }

      return parsedObj;
    }

    return defaultValue;
  }

  public set(key: string, value: string): void {
    this.storage[key] = JSON.stringify(value); // use stringify for prevent from any change with this service users.
  }

  public clear(key: string): void {
    this.storage[key] = null!;
  }
}
