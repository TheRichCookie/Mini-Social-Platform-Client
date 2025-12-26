import type {PipeTransform} from '@angular/core';
import {Pipe} from '@angular/core';

@Pipe({
  name: 'epochToTime',
  standalone: true,
})
export class UkEpochToTimePipe implements PipeTransform {
  public transform(value: number | string | null | undefined): string | null {
    if (value === null || value === undefined) {
      return '-';
    }

    const epoch = Number(value);

    const date = new Date(Number(epoch));

    date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset());
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}
