import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {UkRangeSliderComponent} from '../../../range-slider/range-slider.component'; // adjust import if needed

@Component({
  standalone: true,
  selector: 'uk-time-slider-controller',
  imports: [CommonModule, UkRangeSliderComponent],
  templateUrl: './time-slider-controller.component.html',
  styleUrls: ['./time-slider-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkTimeSliderControllerComponent {
  private _value: number | string = null!;

  @Input()
  public is24Hour = false;

  @Input()
  public range = 'HH:mm';

  @Input()
  public disabled = false;

  @Input()
  public amPm = '';

  @Input()
  public hour = 12;

  @Input()
  public minute = 0;

  @Input()
  public minuteStep = 5;

  @Input()
  public second = 0;

  @Input()
  public secondStep = 5;

  @Input()
  public showCurrent = false;

  @Output()
  public readonly ON_TIME_CHANGE = new EventEmitter<number | string>();

  @Input()
  public set value(v: number | string) {
    this._value = v;

    if (typeof v === 'number') {
      const date = new Date(v * 1000);

      this.setFromDate(date);
    } else if (typeof v === 'string') {
      const parts = v.split(':').map(Number);

      if (this.range === 'HH:mm:ss') {
        const [h, m, s] = parts;

        this.setupTime(h, m, s);
      } else if (this.range === 'mm:ss') {
        const [m, s] = parts;

        this.hour = 0; // Not used
        this.minute = m;
        this.second = s;
      } else {
        // 'HH:mm'
        const [h, m] = parts;

        this.setupTime(h, m);
      }
    }
  }

  public get value(): number | string {
    return this._value;
  }

  public onHourChange(val: number): void {
    this.hour = Math.round(val);
    this.emitChange();
  }

  public onMinuteChange(val: number): void {
    this.minute = Math.round(val);
    this.emitChange();
  }

  public onSecondChange(val: number): void {
    this.second = Math.round(val);
    this.emitChange();
  }

  public toggleAmPm(): void {
    if (this.is24Hour) return;
    this.amPm = this.amPm === 'ق‌ظ' ? 'ب‌ظ' : 'ق‌ظ';
    this.emitChange();
  }

  public setNow(): void {
    const now = new Date();

    this.setFromDate(now);
    this.emitChange();
  }

  private emitChange(): void {
    let hour24 = this.is24Hour
      ? this.hour
      : this.amPm === 'ق‌ظ'
        ? this.hour
        : this.hour + 12;

    if (!this.is24Hour && this.hour === 12 && this.amPm === 'ق‌ظ') {
      hour24 = 0;
    }

    const paddedH = hour24.toString().padStart(2, '0');
    const paddedM = this.minute.toString().padStart(2, '0');
    const paddedS = this.second.toString().padStart(2, '0');

    let timeString: string;

    if (this.range === 'HH:mm:ss') {
      timeString = `${paddedH}:${paddedM}:${paddedS}`;
    } else if (this.range === 'mm:ss') {
      timeString = `${paddedM}:${paddedS}`;
    } else {
      timeString = `${paddedH}:${paddedM}`;
    }

    if (typeof this.value === 'number') {
      const now = new Date();

      if (this.range === 'mm:ss') {
        now.setHours(0);
        now.setMinutes(this.minute);
        now.setSeconds(this.second);
      } else {
        now.setHours(hour24);
        now.setMinutes(this.minute);
        now.setSeconds(this.range === 'HH:mm:ss' ? this.second : 0);
      }

      now.setMilliseconds(0);

      const timestamp = Math.floor(now.getTime() / 1000);

      this.ON_TIME_CHANGE.emit(timestamp);
    } else {
      this.ON_TIME_CHANGE.emit(timeString);
    }
  }

  private setupTime(h: number, m: number, s = 0): void {
    if (this.range !== 'mm:ss') {
      if (this.is24Hour) {
        this.hour = h;
      } else {
        this.hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
        this.amPm = h >= 12 ? 'ب‌ظ' : 'ق‌ظ';
      }
    }

    this.minute = m;
    this.second = s;
  }

  private setFromDate(date: Date): void {
    const h = date.getHours();

    if (!this.is24Hour && this.range !== 'mm:ss') {
      this.amPm = h >= 12 ? 'ب‌ظ' : 'ق‌ظ';
      this.hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    } else if (this.range !== 'mm:ss') {
      this.hour = h;
    }

    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }
}
