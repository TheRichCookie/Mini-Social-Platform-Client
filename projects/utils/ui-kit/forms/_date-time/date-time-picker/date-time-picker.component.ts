import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  type ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
} from '@utils/ui-kit/definitions';
import {UkDateService, UkOverlayService} from '@utils/ui-kit/services';
import {take} from 'rxjs';

import {UkButtonComponent} from '../../../components/button/button.component';
import {UkIconComponent} from '../../../components/icon/icon.component';
import {UkInputComponent} from '../../input/input.component';
import type {UkDateTimeModalValue} from './controller/date-time-controller.component';
import {UkDateTimeControllerComponent} from './controller/date-time-controller.component';

@Component({
  selector: 'uk-date-time-picker',
  imports: [
    CommonModule,
    FormsModule,
    UkButtonComponent,
    UkIconComponent,
    UkInputComponent,
  ],
  templateUrl: './date-time-picker.component.html',
  styleUrl: './date-time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkDateTimePickerComponent),
      multi: true,
    },
  ],
})
export class UkDateTimePickerComponent implements ControlValueAccessor {
  private readonly overlayService = inject(UkOverlayService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dateService = inject(UkDateService);

  @Input()
  public emptyValueStatus: 'DEFAULT' | 'EMPTY' | 'NOW' = 'NOW';

  public dateEpoch: number = null!;
  public timeSpan: string = null!;
  public disabled = false;

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public readonly UK_TYPE = UK_TYPE;
  public value = '';

  public writeValue(epoch: number): void {
    if (epoch) {
      const res = this.splitEpoch(Number(epoch));

      this.dateEpoch = res.dateEpoch;
      this.timeSpan = res.timeSpan;
      this.value = this.formatToInputValue(this.dateEpoch, this.timeSpan);
    } else {
      if (this.emptyValueStatus === 'DEFAULT') {
        this.dateEpoch = Date.now();
        this.timeSpan = '00:00';
        this.value = this.formatToInputValue(this.dateEpoch, this.timeSpan);
      }

      if (this.emptyValueStatus === 'NOW') {
        this.dateEpoch = Date.now();
        this.timeSpan = '00:00';
        this.value = this.formatToInputValue(this.dateEpoch, this.timeSpan);
      }

      if (this.emptyValueStatus === 'EMPTY') {
        // this.dateEpoch = Date.now();
        // this.timeSpan = '00:00';
      }
    }

    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }

  public openDateTimeModal(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    const positionInfo = event ?? 'CENTER_BOTTOM';
    const INPUTS = new Map<string, unknown>([
      ['dateEpoch', this.dateEpoch],
      ['timeSpan', this.timeSpan],
    ]);
    const OVERLAY = this.overlayService.open(UkDateTimeControllerComponent, {
      hasBackdrop: true,
      positionInfo,
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

    OVERLAY.componentRef.instance.ON_CHANGE.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((res: UkDateTimeModalValue) => {
      this.dateEpoch = res.dateEpoch;
      this.timeSpan = res.timeSpan;
      this.value = this.formatToInputValue(res.dateEpoch, res.timeSpan);
      this.changed(res.totalEpoch);
      this.changeDetectorRef.markForCheck();
    });
  }

  private formatToInputValue(epoch: number, timeSpan: string): string {
    const jDate = this.dateService.epochToUKDJalali(epoch);

    const year = jDate.year;
    const month = jDate.month.toString().padStart(2, '0');
    const day = jDate.day.toString().padStart(2, '0');

    return `${year}-${month}-${day} ${timeSpan}`;
  }

  private splitEpoch(epoch: number): {dateEpoch: number; timeSpan: string} {
    const fullDate = new Date(epoch);

    const dateOnly = new Date(
      fullDate.getFullYear(),
      fullDate.getMonth(),
      fullDate.getDate(),
    );
    const dateEpoch = dateOnly.getTime(); // Date part at 00:00:00

    const hours = fullDate.getHours().toString().padStart(2, '0');
    const minutes = fullDate.getMinutes().toString().padStart(2, '0');
    const seconds = fullDate.getSeconds().toString().padStart(2, '0');

    const timeSpan = `${hours}:${minutes}:${seconds}`;

    return {
      dateEpoch,
      timeSpan,
    };
  }
}
