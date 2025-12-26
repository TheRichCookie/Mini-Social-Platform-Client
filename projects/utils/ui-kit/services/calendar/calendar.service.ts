import { Injectable } from '@angular/core';
import type { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

const WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
const MONTHS = [
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

@Injectable()
export class UkNgbDatepickerI18nPersian extends NgbDatepickerI18n {
  public getWeekdayLabel(weekday: number): string {
    return WEEKDAYS_SHORT[weekday - 1];
  }

  public getMonthShortName(month: number): string {
    return MONTHS[month - 1];
  }

  public getMonthFullName(month: number): string {
    return MONTHS[month - 1];
  }

  public getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`;
  }
}
