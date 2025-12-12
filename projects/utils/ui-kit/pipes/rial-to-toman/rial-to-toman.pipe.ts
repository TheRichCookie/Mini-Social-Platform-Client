import type {PipeTransform} from '@angular/core';
import {Pipe} from '@angular/core';

@Pipe({
  name: 'rialToToman',
  standalone: true,
})
export class UkRialToToman implements PipeTransform {
  public transform(value: number | null | undefined): number | null {
    if (value === null || value === undefined) {
      return null;
    }

    const SURE_NUMBER = Number(value);

    return SURE_NUMBER / 10;
  }
}
