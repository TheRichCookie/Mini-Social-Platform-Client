import type { PipeTransform } from '@angular/core';
import { inject, Pipe } from '@angular/core';

import { UkDateService } from '../../services';

@Pipe({
  name: 'epochToJalali',
  standalone: true,
})
export class UkEpochToJalaliPipe implements PipeTransform {
  private readonly dateService = inject(UkDateService);

  public transform(
    value: number | string | null | undefined,
    monthType: 'NAME' | 'NUMBER' = 'NUMBER',
    separator: 'COMMA' | 'DASH' | 'SLASH' | 'SPACE' = 'SLASH',
  ): string | null {
    if (value === null || value === undefined) {
      return '-';
    }

    const epoch = Number(value);
    const JALALI_DATE = this.dateService.epochToUKDJalaliString(
      epoch,
      monthType,
    );

    return `\u200E${JALALI_DATE.year}${this.getSeparator(separator)}\u200E${JALALI_DATE.month}${this.getSeparator(separator)}\u200E${JALALI_DATE.day}`;
  }

  protected getSeparator(type: 'COMMA' | 'DASH' | 'SLASH' | 'SPACE'): string {
    let separator = '';

    if (type === 'COMMA') {
      separator = '،';
    }

    if (type === 'DASH') {
      separator = '-';
    }

    if (type === 'SLASH') {
      separator = '/';
    }

    if (type === 'SPACE') {
      separator = ' ';
    }

    return separator;
  }
}
