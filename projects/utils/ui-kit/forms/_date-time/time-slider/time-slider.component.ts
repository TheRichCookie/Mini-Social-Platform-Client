import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
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
import {UkOverlayService} from '@utils/ui-kit/services';
import {take} from 'rxjs';

import {UkButtonComponent} from '../../../components/button/button.component';
import {UkIconComponent} from '../../../components/icon/icon.component';
import {UkInputComponent} from '../../input/input.component';
import {UkTimeSliderControllerComponent} from './controller/time-slider-controller.component';

@Component({
  selector: 'uk-time-slider',
  imports: [
    CommonModule,
    UkTimeSliderControllerComponent,
    UkButtonComponent,
    UkIconComponent,
    UkInputComponent,
    FormsModule,
  ],
  templateUrl: './time-slider.component.html',
  styleUrl: './time-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkTimeSliderComponent),
      multi: true,
    },
  ],
})
export class UkTimeSliderComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly overlayService = inject(UkOverlayService);
  private readonly destroyRef = inject(DestroyRef);

  @Input()
  public mode: 'IN_LINE' | 'POPUP' = 'POPUP';

  @Input()
  public range: 'HH:mm:ss' | 'HH:mm' | 'mm:ss' = 'HH:mm';

  @Input()
  public is24Hour = false;

  @Input()
  public minuteStep = 5; // 5, 10, 15 etc

  @Input()
  public secondStep = 5; // 5, 10, 15 etc

  @Input()
  public showCurrent = false;

  @Output()
  public readonly ON_TIME_CHANGE = new EventEmitter<number | string>();

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public readonly UK_TYPE = UK_TYPE;
  public value: number | string = null!;
  public disabled = false;
  public hour = 12;
  public minute = 0;
  public amPm: 'ب‌ظ' | 'ق‌ظ' = 'ق‌ظ'; // AM/PM in Persian

  public get mask(): string {
    if (this.range === 'HH:mm:ss') {
      return '00:00:00';
    }

    return '00:00';
  }

  public openTimeModal(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    const positionInfo = event ?? 'CENTER_BOTTOM';
    const INPUTS = new Map<string, unknown>([
      ['is24Hour', this.is24Hour],
      ['range', this.range],
      ['amPm', this.amPm],
      ['hour', this.hour],
      ['minute', this.minute],
      ['minuteStep', this.minuteStep],
      ['secondStep', this.secondStep],
      ['showCurrent', this.showCurrent],
      ['value', this.value],
    ]);
    const OVERLAY = this.overlayService.open(UkTimeSliderControllerComponent, {
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

    OVERLAY.componentRef.instance.ON_TIME_CHANGE.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((res) => {
      this.onTimeChange(res);
      // OVERLAY.overlayRef.dispose();
    });
  }

  public onTimeChange(e: number | string): void {
    this.value = e;
    this.changed(e);
    this.changeDetectorRef.markForCheck();
  }

  public writeValue(value: number | string): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
