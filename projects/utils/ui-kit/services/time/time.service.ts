import { Injectable } from '@angular/core';

import type { UkPeriodType, UkTimeFormat } from '../../definitions';

export interface UkTime {
  hours: number | string;
  minutes: number | string;
  timeFormat?: UkTimeFormat;
  timePeriod?: UkPeriodType;
  stringFormat?: string;
}

export interface UkTimeOutput {
  hours: number;
  minutes: number;
  timeFormat?: UkTimeFormat;
  timePeriod: UkPeriodType;
  stringFormat: string;
}

@Injectable({
  providedIn: 'root',
})
export class UkTimeService {
  public epochToTime(value: number | string): UkTime {
    const epoch = Number(value);

    const date = new Date(Number(epoch));

    const time: UkTime = {
      hours: date.getHours().toString().padStart(2, '0'),
      minutes: date.getMinutes().toString().padStart(2, '0'),
    };

    return time;
  }

  public timeToEpoch(value: UkTime): number {
    const date = new Date();

    date.setHours(Number(value.hours));
    date.setMinutes(Number(value.minutes));

    return date.getTime(); // Get the time in epoch (milliseconds)
  }

  public getCurrentTimeString(): string {
    const date = new Date();

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
