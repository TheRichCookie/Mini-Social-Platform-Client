import {CommonModule} from '@angular/common';
import type {ElementRef} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import type {ControlValueAccessor} from '@angular/forms';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
} from '@utils/ui-kit/definitions';

@Component({
  selector: 'uk-range-slider',
  imports: [CommonModule],
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vertical]': 'vertical',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkRangeSliderComponent),
      multi: true,
    },
  ],
})
export class UkRangeSliderComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private draggingThumb: 'high' | 'low' | null = null;

  private changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  private touched = UIKIT_EMPTY_FUNCTION;

  @Input()
  public min = 0;

  @Input()
  public max = 100;

  @Input()
  public step = 1;

  @Input()
  public singleThumb = false;

  @Input()
  public vertical = false;

  @Input()
  public disabled = false;

  @Input()
  public showTicks = true;

  @Input()
  public showTooltips = true;

  @Input()
  public tickInterval = 10;

  @Input()
  public value = 25;

  @Input()
  public highValue = 75;

  @Output()
  public readonly ON_VALUE_CHANGE = new EventEmitter<number>();

  @Output()
  public readonly ON_HIGH_VALUE_CHANGE = new EventEmitter<number>();

  @ViewChild('track', {static: true})
  public track!: ElementRef<HTMLDivElement>;

  public get percentLow(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  public get percentHigh(): number {
    return ((this.highValue - this.min) / (this.max - this.min)) * 100;
  }

  public get ticks(): number[] {
    const ticks = [];

    for (let i = this.min; i <= this.max; i += this.tickInterval) {
      if (i <= this.max) {
        ticks.push(i);
      }
    }

    if (ticks[ticks.length - 1] !== this.max) {
      ticks.push(this.max);
    }

    return ticks;
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  public stopDrag(): void {
    if (this.draggingThumb) {
      this.draggingThumb = null;
      this.touched();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  public onDrag(event: MouseEvent | TouchEvent): void {
    if (!this.draggingThumb || this.disabled) return;

    const clientX =
      event instanceof TouchEvent ? event.touches[0].clientX : event.clientX;
    const clientY =
      event instanceof TouchEvent ? event.touches[0].clientY : event.clientY;
    const rect = this.track.nativeElement.getBoundingClientRect();
    let percent = this.vertical
      ? ((rect.bottom - clientY) / rect.height) * 100
      : ((clientX - rect.left) / rect.width) * 100;

    percent = Math.max(0, Math.min(100, percent));

    const value = this.percentToValue(percent);
    let snappedValue = this.stickToStep(value);

    snappedValue = this.clamp(snappedValue);

    if (this.draggingThumb === 'low') {
      this.value = Math.min(snappedValue, this.highValue);
      this.ON_VALUE_CHANGE.emit(this.value);
    } else {
      this.highValue = Math.max(snappedValue, this.value);
      this.ON_HIGH_VALUE_CHANGE.emit(this.highValue);
    }

    this.emitChange();
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    const stepMove =
      event.key === 'ArrowRight' || event.key === 'ArrowUp'
        ? this.step
        : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
          ? -this.step
          : 0;

    if (stepMove !== 0) {
      event.preventDefault();

      if (this.singleThumb) {
        this.value = this.clamp(this.value + stepMove);
        this.ON_VALUE_CHANGE.emit(this.value);
      } else {
        this.highValue = this.clamp(this.highValue + stepMove);
        this.ON_HIGH_VALUE_CHANGE.emit(this.highValue);
      }

      this.emitChange();
    }
  }

  public writeValue(obj: number | [number, number]): void {
    if (typeof obj === 'number') {
      this.value = obj;
    } else if (Array.isArray(obj)) {
      [this.value, this.highValue] = obj;
    }

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
    this.changeDetectorRef.markForCheck();
  }

  public getTickPosition(tick: number): {
    bottom: number | null;
    left: number | null;
  } {
    const percent = ((tick - this.min) / (this.max - this.min)) * 100;

    if (this.vertical) {
      return {bottom: percent, left: null};
    } else {
      return {bottom: null, left: percent};
    }
  }

  public startDrag(
    thumb: 'high' | 'low',
    event: MouseEvent | TouchEvent,
  ): void {
    if (this.disabled) return;
    this.draggingThumb = thumb;
    event.preventDefault();
  }

  public onTrackClick(event: KeyboardEvent | MouseEvent): void {
    if (event instanceof MouseEvent) {
      if (this.disabled) return;

      const rect = this.track.nativeElement.getBoundingClientRect();
      const clickPos = this.vertical
        ? rect.bottom - event.clientY
        : event.clientX - rect.left;
      const percent =
        (clickPos / (this.vertical ? rect.height : rect.width)) * 100;
      const value = this.percentToValue(percent);
      const snappedValue = this.stickToStep(value);

      if (
        this.singleThumb ||
        Math.abs(snappedValue - this.value) <
          Math.abs(snappedValue - this.highValue)
      ) {
        this.value = Math.min(snappedValue, this.highValue);
        this.ON_VALUE_CHANGE.emit(this.value);
      } else {
        this.highValue = Math.max(snappedValue, this.value);
        this.ON_HIGH_VALUE_CHANGE.emit(this.highValue);
      }

      this.emitChange();
    }
  }

  private percentToValue(percent: number): number {
    return this.min + ((this.max - this.min) * percent) / 100;
  }

  private stickToStep(val: number): number {
    const steps = Math.round((val - this.min) / this.step);

    return this.min + steps * this.step;
  }

  private clamp(val: number): number {
    return Math.max(this.min, Math.min(this.max, val));
  }

  private emitChange(): void {
    if (this.singleThumb) {
      this.changed(this.value);
    } else {
      this.changed([this.value, this.highValue]);
    }

    this.changeDetectorRef.markForCheck();
  }
}
