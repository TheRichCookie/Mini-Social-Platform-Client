import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import type {ControlValueAccessor} from '@angular/forms';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import type {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {
  NgbCalendar,
  NgbCalendarPersian,
  NgbDatepickerI18n,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import type {DatePickerType, UkCursor} from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
  UkDatePickerType,
} from '@utils/ui-kit/definitions';
import {UkDateService} from '@utils/ui-kit/services';

import {UkButtonComponent} from '../../../components/button/button.component';
import {UkIconComponent} from '../../../components/icon/icon.component';
import {UkDatepickerI18nPersian} from './date-picker-i18n-persian';

@Component({
  selector: 'uk-date-picker',
  imports: [
    CommonModule,
    NgbDatepickerModule,
    FormsModule,
    UkButtonComponent,
    UkIconComponent,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkDatePickerComponent),
      multi: true,
    },
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: UkDatepickerI18nPersian},
  ],
})
export class UkDatePickerComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly dateService = inject(UkDateService);

  @Input()
  public dataPickerType: DatePickerType = DEFAULT.datePicker.type;

  @Input()
  public cursor: UkCursor = DEFAULT.datePicker.cursor;

  public today = inject(NgbCalendar).getToday();
  public model!: NgbDateStruct;
  public date!: {year: number; month: number};
  public isDisabled = false;
  public readonly UK_TYPE = UK_TYPE;
  public readonly DATE_PICKER_TYPE = UkDatePickerType;

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public writeValue(value: number | null): void {
    this.model = value ? this.epochToStruct(value) : undefined!;
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }

  public onModelChange(model: NgbDateStruct): void {
    this.model = model;
    const epoch = model ? this.structToEpoch(model) : null;

    this.changed(epoch);
    this.changeDetectorRef.markForCheck();
  }

  private epochToStruct(epoch: number): NgbDateStruct {
    return this.dateService.epochToUKDJalali(epoch);
  }

  private structToEpoch(struct: NgbDateStruct): number {
    return this.dateService.uKDJalaliToEpoch(
      struct.year,
      struct.month,
      struct.day,
    );
  }
}

// how to install ng-bootstrap:
// ------------------------------------
//  npm i @ng-bootstrap/ng-bootstrap
//  npm i @popperjs/core
//  npm i @angular/localize
//  add @angular/localize/init to angular.json[polyfills]
// ------------------------------------
