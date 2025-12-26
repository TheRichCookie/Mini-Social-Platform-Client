import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UkStringService {
  public isString(value: number | string): boolean {
    return !!(typeof value === 'string' || value);
  }

  public addSeparator(str: string, separator = ','): string {
    return str.replaceAll(
      /(?<!^)(?=([0-9\u06F0-\u06F9]{3})+(?![0-9\u06F0-\u06F9]))/g,
      separator,
    );
  }
}
