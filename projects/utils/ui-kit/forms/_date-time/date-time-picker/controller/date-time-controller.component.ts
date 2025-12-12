import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {UK_TYPE} from '@utils/ui-kit/definitions';

import {UkDatePickerComponent} from '../../date-picker/date-picker.component';
import {UkTimeSliderComponent} from '../../time-slider/time-slider.component';

export interface UkDateTimeModalValue {
  dateEpoch: number;
  timeSpan: string;
  totalEpoch: number;
}

@Component({
  selector: 'uk-date-time-controller',
  imports: [
    CommonModule,
    FormsModule,
    UkDatePickerComponent,
    UkTimeSliderComponent,
  ],
  templateUrl: './date-time-controller.component.html',
  styleUrl: './date-time-controller.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkDateTimeControllerComponent),
      multi: true,
    },
  ],
})
export class UkDateTimeControllerComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public dateEpoch: number = null!;

  @Input()
  public timeSpan: string = null!;

  @Output()
  public readonly ON_CLOSE = new EventEmitter<null>();

  @Output()
  public readonly ON_CHANGE = new EventEmitter<UkDateTimeModalValue>();

  public readonly UK_TYPE = UK_TYPE;

  public onModelChange(): void {
    this.ON_CHANGE.emit({
      dateEpoch: this.dateEpoch,
      timeSpan: this.timeSpan ?? '00:00',
      totalEpoch: this.dateEpoch + this.timeSpanToMilliseconds(this.timeSpan),
    });
  }

  private timeSpanToMilliseconds(time: string): number {
    if (!time) {
      return 0;
    }

    const [hoursStr, minutesStr] = time.split(':');
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error('Invalid time format');
    }

    const totalMinutes = hours * 60 + minutes;
    const milliseconds = totalMinutes * 60_000;

    return milliseconds;
  }
}
