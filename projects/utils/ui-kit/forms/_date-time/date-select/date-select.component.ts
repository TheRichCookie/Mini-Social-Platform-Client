/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {CommonModule} from '@angular/common';
import type {AfterViewInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  inject,
  Input,
  Output,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import type {ControlValueAccessor} from '@angular/forms';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {take} from 'rxjs';

import {UkTextComponent} from '../../../components';
import {UkIconComponent} from '../../../components/icon/icon.component';
import type {CrudMode, DateSelectSeparator} from '../../../definitions';
import {
  DEFAULT,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
  UkDateSelectEmptyStatus,
  UkDateSelectSeparator,
} from '../../../definitions';
import type {UkDate} from '../../../services';
import {
  JALALI_MONTHS,
  UkDateService,
  UkOverlayService,
} from '../../../services';
import {UkDateSelectOverlayComponent} from './date-select-overlay/date-select-overlay.component';

@Component({
  standalone: true,
  selector: 'uk-date-select',
  imports: [CommonModule, FormsModule, UkTextComponent, UkIconComponent],
  templateUrl: './date-select.component.html',
  styleUrl: './date-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkDateSelectComponent),
      multi: true,
    },
  ],
})
export class UkDateSelectComponent
  implements ControlValueAccessor, AfterViewInit
{
  private readonly overlayService = inject(UkOverlayService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly dateService = inject(UkDateService);

  private _value: number = null!;
  private _emptyValueStatus: UkDateSelectEmptyStatus =
    UkDateSelectEmptyStatus.DEFAULT;

  private _popupEmptyValueStatus: UkDateSelectEmptyStatus =
    UkDateSelectEmptyStatus.NOW;

  private readonly defaultStartYear = 1370;

  @Input()
  public separator: DateSelectSeparator = UkDateSelectSeparator.SLASH;

  @Input()
  public crudMode: CrudMode = DEFAULT.dateSelect.crudMode;

  @Input()
  public placeholder = 'روز / ماه / سال';

  @Input()
  public isDisabled = false;

  @Output()
  public readonly ON_CHANGE = new EventEmitter();

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public J_DATE: UkDate = {
    year: null!,
    month: null!,
    day: null!,
  };

  public readonly UK_TYPE = UK_TYPE;
  public destroyRef = inject(DestroyRef);

  public persianMonths = JALALI_MONTHS;

  @Input()
  public set value(v: number) {
    if (v) {
      this.J_DATE = this.dateService.epochToUKDJalali(v);
    } else {
      this.presentEmptyValue();
    }

    this._value = v;
  }

  @Input()
  public set emptyValueStatus(v: UkDateSelectEmptyStatus) {
    this._emptyValueStatus = v;
    this.presentEmptyValue();
  }

  @Input()
  public set popupEmptyValueStatus(v: UkDateSelectEmptyStatus) {
    this._popupEmptyValueStatus = v;
  }

  public get value(): number {
    return this._value;
  }

  public get emptyValueStatus(): UkDateSelectEmptyStatus {
    return this._emptyValueStatus;
  }

  public get popupEmptyValueStatus(): UkDateSelectEmptyStatus {
    return this._popupEmptyValueStatus;
  }

  public presentEmptyValue(): void {
    if (!this._value) {
      if (this._emptyValueStatus === UkDateSelectEmptyStatus.DEFAULT) {
        const jDate = this.dateService.epochToUKDJalali(Date.now());

        jDate.year = this.defaultStartYear;
        this.onInput(jDate);
      }

      if (this._emptyValueStatus === UkDateSelectEmptyStatus.NOW) {
        const jDate = this.dateService.epochToUKDJalali(Date.now());

        this.onInput(jDate);
      }

      if (this._emptyValueStatus === UkDateSelectEmptyStatus.EMPTY) {
        this.onInput(null!);
      }
    }
  }

  public showOverlay(): void {
    let tempJDate: UkDate = {
      year: null!,
      month: null!,
      day: null!,
    };

    if (this.J_DATE.year || this.J_DATE.month || this.J_DATE.day) {
      tempJDate = this.J_DATE;
    } else if (
      this._emptyValueStatus === UkDateSelectEmptyStatus.DEFAULT ||
      this._emptyValueStatus === UkDateSelectEmptyStatus.NOW
    ) {
      tempJDate = this.J_DATE;
    } else {
      if (this._popupEmptyValueStatus === 'DEFAULT') {
        tempJDate = this.dateService.epochToUKDJalali(Date.now());

        tempJDate.year = this.defaultStartYear;
      }

      if (this._popupEmptyValueStatus === 'NOW') {
        tempJDate = this.dateService.epochToUKDJalali(Date.now());
      }

      if (this._popupEmptyValueStatus === 'EMPTY') {
        // nothing to do
      }
    }

    const INPUTS = new Map<string, unknown>([['ukDate', tempJDate]]);
    const OVERLAY = this.overlayService.open(UkDateSelectOverlayComponent, {
      hasBackdrop: true,
      positionInfo: 'CENTER_BOTTOM',
      inputs: INPUTS,
    });

    OVERLAY.overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => {
        OVERLAY.overlayRef.dispose();
      });

    OVERLAY.componentRef.instance.ON_CLOSE.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      OVERLAY.overlayRef.dispose();
    });

    OVERLAY.componentRef.instance.ON_CANCEL.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      OVERLAY.overlayRef.dispose();
    });

    OVERLAY.componentRef.instance.ON_SUBMIT.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((date: UkDate) => {
      this.onInput(date);
      this.ON_CHANGE.emit();
      OVERLAY.overlayRef.dispose();
      this.changeDetectorRef.markForCheck();
    });
  }

  public getSeparator(): string {
    let separator = '';

    if (this.separator === UkDateSelectSeparator.SLASH) {
      separator = '/';
    }

    if (this.separator === UkDateSelectSeparator.COMMA) {
      separator = '،';
    }

    if (this.separator === UkDateSelectSeparator.DASH) {
      separator = '-';
    }

    return separator;
  }

  public onInput(value: UkDate): void {
    if (value) {
      this.J_DATE = value;
      const epoch = this.dateService.uKDJalaliToEpoch(
        value.year,
        value.month,
        value.day,
      );

      this.changed(epoch);
    } else {
      this.J_DATE = {
        year: null!,
        month: null!,
        day: null!,
      };
      this.changed(null);
    }

    this.touched();
  }

  public writeValue(value: number): void {
    this.value = value;
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public ngAfterViewInit(): void {
    this.presentEmptyValue();
  }

  public setDisabledState(disabled: boolean): void {
    this.isDisabled = disabled;
    this.changeDetectorRef.markForCheck();
  }

  @HostBinding('class.uk-date-select-is-disabled-TRUE')
  private get isDisabledBinding(): boolean {
    return this.isDisabled;
  }
}
