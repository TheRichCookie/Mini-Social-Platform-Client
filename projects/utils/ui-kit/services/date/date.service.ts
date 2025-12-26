import { inject, Injectable } from '@angular/core';
// import {JalaliDateCalculatorService, JalaliDateValidatorService} from 'ngx-persian';
import {
  isLeapJalaaliYear,
  isValidJalaaliDate,
  toGregorian,
  toJalaali,
} from 'jalaali-js';

import { UkNumberService } from '../number/number.service';
import { UkStringService } from '../string/string.service';

// in UkDate month is zero base
export interface UkDate {
  year: number;
  month: number;
  day: number;
}

// in UkPaddedDate month is NOT zero base
export interface UkPaddedDate {
  year: string;
  month: string;
  day: string;
}

// in UkStringDate month is NOT zero base
export interface UkStringDate {
  year: string;
  month: string;
  day: string;
}

export const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

@Injectable({
  providedIn: 'root',
})
export class UkDateService {
  private readonly numberService = inject(UkNumberService);
  private readonly stringService = inject(UkStringService);

  // UKDJalali
  /**
   *
   * @param jYear
   * @param jMonth is zero base
   * @param jDay
   * @returns
   */
  public uKDJalaliToGeorgian(
    jYear: number,
    jMonth: number,
    jDay: number,
  ): Date {
    const gDate = toGregorian(jYear, jMonth, jDay);

    return new Date(gDate.gy, gDate.gm - 1, gDate.gd);
  }

  public uKDJalaliToUKDGregorian(
    jYear: number,
    jMonth: number,
    jDay: number,
  ): UkDate {
    const gDate = this.uKDJalaliToGeorgian(jYear, jMonth, jDay);

    // return this.jalaliDateCalculatorService.convertToJalali(gDate);
    return {
      year: gDate.getFullYear(),
      month: gDate.getMonth() + 1,
      day: gDate.getDate(),
    };
  }

  public uKDJalaliToString(
    jYear: number,
    jMonth: number,
    jDay: number,
    divider = '/',
  ): string {
    const year = String(jYear);
    const month = this.numberService.paddedNumber(jMonth);
    const day = this.numberService.paddedNumber(jDay);

    return `${year}${divider}${month}${divider}${day}`;
  }

  /**
   *
   * @param jYear
   * @param jMonth is zero base
   * @param jDay
   * @returns number
   */
  public uKDJalaliToEpoch(jYear: number, jMonth: number, jDay: number): number {
    const date = this.uKDJalaliToGeorgian(jYear, jMonth, jDay);

    return this.gregorianToEpoch(date);
  }

  // gregorian
  public gregorianToUKDJalali(gDate: Date): UkDate {
    const jDate = toJalaali(
      gDate.getFullYear(),
      gDate.getMonth() + 1,
      gDate.getDate(),
    );

    return {
      year: jDate.jy,
      month: jDate.jm - 1,
      day: jDate.jd,
    };
  }

  public gregorianToUKDGregorian(gDate: Date): UkDate {
    const ukdG: UkDate = {
      year: gDate.getFullYear(),
      month: gDate.getMonth(),
      day: gDate.getDate(),
    };

    return ukdG;
  }

  public gregorianToEpoch(gDate: Date): number {
    return gDate.getTime();
  }

  // epoch
  public epochToUKDJalali(epoch: number): UkDate {
    // TODO: currently our backend does not support javascript bigint,
    // so we cast string to number
    if (this.stringService.isString(epoch)) {
      epoch = Number(epoch);
    }

    const GREGORIAN_DATE = new Date(epoch);

    return this.gregorianToUKDJalali(GREGORIAN_DATE);
  }

  public epochToUKDJalaliString(
    epoch: number,
    monthType: 'NAME' | 'NUMBER' = 'NUMBER',
  ): UkStringDate {
    if (this.stringService.isString(epoch)) {
      epoch = Number(epoch);
    }

    const GREGORIAN_DATE = new Date(epoch);
    const JALALI_DATE = this.gregorianToUKDJalali(GREGORIAN_DATE);

    if (monthType === 'NAME') {
      return {
        day: `${JALALI_DATE.day}`,
        month: this.jalaliMonthToString(JALALI_DATE.month + 1),
        year: `${JALALI_DATE.year}`,
      };
    }

    return {
      day: `${JALALI_DATE.day}`,
      month: `${JALALI_DATE.month + 1}`,
      year: `${JALALI_DATE.year}`,
    };
  }

  public epochToUKDGregorian(epoch: number): UkDate {
    const GREGORIAN_DATE = new Date(Number(epoch));

    return this.gregorianToUKDGregorian(GREGORIAN_DATE);
  }

  // validation
  public isJYearLeap(jYear: number): boolean {
    return isLeapJalaaliYear(jYear);
  }

  public isValidJDate(jYear: number, jMonth: number, jDay: number): boolean {
    return isValidJalaaliDate(jYear, jMonth, jDay);
  }

  // current
  public getCurrentUKDJalali(): UkDate {
    const currentDate = new Date();

    return this.gregorianToUKDJalali(currentDate);
  }

  public jalaliMonthToString(month: number): string {
    return JALALI_MONTHS[month];
  }

  public getCurrentTimeInEpoch(): number {
    const NOW = new Date();

    return this.gregorianToEpoch(NOW);
  }

  public getStartOfTheDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  public getStartOfTheDayInEpoch(): number {
    const NOW = new Date();
    const START_DATE_TIME = this.getStartOfTheDay(NOW);

    return this.gregorianToEpoch(START_DATE_TIME);
  }

  public getStartOfDayDaysAgoInEpoch(days: number): number {
    const today = new Date();
    const pastDate = this.getStartOfTheDay(today);

    pastDate.setDate(today.getDate() - days);

    return this.gregorianToEpoch(pastDate);
  }
}

// https://codedamn.com/news/javascript/how-to-convert-timestamp-to-date-in-javascript
//
//
// ******************************convert time-stamp to date
// let unix_timestamp = 1549312452;

// // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds
// var date = new Date(unix_timestamp * 1000);

// // Hours part from the timestamp
// var hours = date.getHours();

// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();

// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// // Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

// console.log(formattedTime);
