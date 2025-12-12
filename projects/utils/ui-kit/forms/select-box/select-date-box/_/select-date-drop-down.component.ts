import {CommonModule} from '@angular/common';
import type {AfterViewInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import type {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {
  NgbCalendar,
  NgbCalendarPersian,
  NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import {UkScrollComponent} from '@utils/ui-kit/arrangements';
import {UkButtonComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import type {
  UkDateRangeDataModel,
  UkDateRangeOptionModel,
} from '@utils/ui-kit/definitions/components/select-date-box/select-date-box.interface';
import {UkDateRangeTypes} from '@utils/ui-kit/definitions/components/select-date-box/select-date-box.interface';
import {
  UkRadioButtonComponent,
  UkRadioButtonGroupComponent,
} from '@utils/ui-kit/forms/public-api';
import {type UkDate, UkDateService} from '@utils/ui-kit/services';
import {UkNgbDatepickerI18nPersian} from '@utils/ui-kit/services/calendar/calendar.service';

@Component({
  standalone: true,
  selector: 'uk-select-date-drop-down',
  imports: [
    NgbDatepickerModule,
    FormsModule,
    CommonModule,
    UkRadioButtonGroupComponent,
    UkRadioButtonComponent,
    UkScrollComponent,
    UkButtonComponent,
  ],
  templateUrl: './select-date-drop-down.component.html',
  styleUrls: ['./select-date-drop-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: UkNgbDatepickerI18nPersian},
  ],
})
export class UkSelectDateDropdownComponent implements AfterViewInit {
  @ViewChild('d', {static: true})
  private readonly datepicker!: NgbDatepicker;

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly dateService = inject(UkDateService);
  private readonly ngbCalendar = inject(NgbCalendar);
  private readonly today = this.ngbCalendar.getToday();

  @Input()
  public firstDayOfWeek = 6;

  @Input()
  public navigation: 'arrows' | 'none' | 'select' = 'arrows';

  @Input()
  public hasPredefinedOptions = true;

  @Input()
  public rangeDate: UkDateRangeTypes | null = null;

  @Input()
  public rangeDateOptions: UkDateRangeOptionModel[] = [];

  @Output()
  public readonly ON_CALENDAR_SUBMIT =
    new EventEmitter<UkDateRangeDataModel | null>();

  @Output()
  public readonly ON_RANGE_DATE_TYPE_CHANGE =
    new EventEmitter<UkDateRangeTypes | null>();

  public readonly dateRangeTypes = UkDateRangeTypes;
  public readonly UK_TYPE = UK_TYPE;

  public hoveredDate: NgbDate | null = null;
  public startDateInternalValue: NgbDate = this.today;
  public toDateInternalValue: NgbDate | null = this.ngbCalendar.getNext(
    this.startDate,
    'd',
    30,
  );

  public selectedDateRangeOptions: number[] = [];

  public get startDate(): NgbDate {
    return this.startDateInternalValue;
  }

  @Input()
  public set startDate(epoch: number | string) {
    if (epoch) {
      const EPOCH = typeof epoch === 'string' ? Number(epoch) : epoch;
      const DATE = this.dateService.epochToUKDJalali(EPOCH);

      this.startDateInternalValue = new NgbDate(
        DATE.year,
        DATE.month,
        DATE.day,
      );
    }
  }

  public get toDate(): UkDate | null {
    return this.toDateInternalValue;
  }

  @Input()
  public set toDate(epoch: number | string | null) {
    if (epoch) {
      const EPOCH = typeof epoch === 'string' ? Number(epoch) : epoch;
      const DATE = this.dateService.epochToUKDJalali(EPOCH);

      this.toDateInternalValue = new NgbDate(DATE.year, DATE.month, DATE.day);
    }
  }

  public ngAfterViewInit(): void {
    // ensure the rendered datepicker navigates to the startDate on init
    // navigateTo expects an NgbDateStruct or { year, month } – pass full struct
    if (this.datepicker && this.startDate) {
      this.datepicker.navigateTo(this.startDate);
    }
  }

  public onDateSelection(date: NgbDate): void {
    if (!this.startDate && !this.toDate) {
      this.startDateInternalValue = date;
    } else if (this.startDate && !this.toDate && date.after(this.startDate)) {
      this.toDateInternalValue = date;
    } else {
      this.toDateInternalValue = null;
      this.startDateInternalValue = date;
    }
  }

  public onRangeDateChange(): void {
    this.ON_RANGE_DATE_TYPE_CHANGE.emit(this.rangeDate);
  }

  public onCalendarSubmit(): void {
    let calendarData: UkDateRangeDataModel;

    const START_DATE_EPOCH = this.dateService.uKDJalaliToEpoch(
      this.startDate.year,
      this.startDate.month,
      this.startDate.day,
    );

    calendarData = {
      startDate: START_DATE_EPOCH,
    };

    if (this.toDate) {
      const TO_DATE_EPOCH = this.dateService.uKDJalaliToEpoch(
        this.toDate.year,
        this.toDate.month,
        this.toDate.day,
      );

      calendarData = {
        startDate: START_DATE_EPOCH,
        toDate: TO_DATE_EPOCH,
      };
    }

    this.ON_CALENDAR_SUBMIT.emit(calendarData);
  }

  public isHovered(date: NgbDate): boolean | null {
    return (
      this.startDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.startDate) &&
      date.before(this.hoveredDate)
    );
  }

  public isInside(date: NgbDate): boolean | null {
    return (
      this.toDate &&
      (date.equals(this.startDate) ||
        (date.after(this.startDate) && date.before(this.toDate)))
    );
  }

  public isRange(date: NgbDate): boolean | null {
    return (
      date.equals(this.startDate) ??
      (this.toDate && date.equals(this.toDate)) ??
      this.isInside(date) ??
      this.isHovered(date)
    );
  }
}
