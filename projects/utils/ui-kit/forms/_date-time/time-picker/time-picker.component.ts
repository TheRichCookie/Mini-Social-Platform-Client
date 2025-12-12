import {CommonModule} from '@angular/common';
import type {ElementRef} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  ViewChild,
} from '@angular/core';
import type {ControlValueAccessor} from '@angular/forms';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
} from '@utils/ui-kit/definitions';

@Component({
  selector: 'uk-time-picker',
  imports: [CommonModule],
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkTimePickerComponent),
      multi: true,
    },
  ],
})
export class UkTimePickerComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private isDragging = false;

  @ViewChild('hourSvg', {static: true})
  public hourSvg!: ElementRef<SVGSVGElement>;

  @ViewChild('minuteSvg', {static: true})
  public minuteSvg!: ElementRef<SVGSVGElement>;

  public selectedHour = 12;
  public selectedMinute = 0;
  public isPM = false;
  public hours = Array.from({length: 12}, (_, i) => i + 1);
  public minutes = Array.from({length: 60}, (_, i) => i + 1);

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public writeValue(value: string): void {
    if (value) {
      const date = new Date(`1970-01-01T${value}`);

      this.selectedHour = date.getHours() % 12 || 12;
      this.selectedMinute = date.getMinutes();
      this.isPM = date.getHours() >= 12;
    }
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState?(_isDisabled: boolean): void {}

  public toggleMeridian(): void {
    this.isPM = !this.isPM;
    this.emitValue();
  }

  public getX(unit: number, type: 'HOUR' | 'MINUTE', radius: number): number {
    let angle = 0;

    if (type === 'HOUR') {
      angle = ((unit % 12) / 12) * 360 - 90;
    }

    if (type === 'MINUTE') {
      angle = ((unit % 60) / 60) * 360 - 90;
    }

    return 100 + radius * Math.cos((angle * Math.PI) / 180);
  }

  public getY(unit: number, type: 'HOUR' | 'MINUTE', radius: number): number {
    let angle = 0;

    if (type === 'HOUR') {
      angle = ((unit % 12) / 12) * 360 - 90;
    }

    if (type === 'MINUTE') {
      angle = ((unit % 60) / 60) * 360 - 90;
    }

    return 100 + radius * Math.sin((angle * Math.PI) / 180);
  }

  public startDrag(event: MouseEvent, type: 'HOUR' | 'MINUTE'): void {
    this.isDragging = true;

    if (type === 'HOUR') {
      this.setHourFromMouse(event);
    }

    if (type === 'MINUTE') {
      this.setMinuteFromMouse(event);
    }
  }

  public stopDrag(): void {
    this.isDragging = false;
  }

  public onDrag(event: MouseEvent, type: 'HOUR' | 'MINUTE'): void {
    if (this.isDragging) {
      if (type === 'HOUR') {
        this.setHourFromMouse(event);
      }

      if (type === 'MINUTE') {
        this.setMinuteFromMouse(event);
      }
    }
  }

  private setHourFromMouse(event: MouseEvent): void {
    const rect = this.hourSvg.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left - 100;
    const y = event.clientY - rect.top - 100;

    // Calculate angle from center using atan2
    let angle = Math.atan2(y, x);

    // Rotate so that 12 o'clock is 0 degrees
    angle = angle - Math.PI / 2;

    // Normalize to positive angle [0, 2π)
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    // Convert to degrees
    const degrees = angle * (180 / Math.PI);

    // Round to the nearest 30-degree segment (for 12-hour clock face)
    const rounded = Math.floor((degrees + 15) / 30) % 12 || 12;

    // The hour should be between 1 and 12
    this.selectedHour = rounded <= 6 ? rounded + 6 : rounded - 6;
  }

  private setMinuteFromMouse(event: MouseEvent): void {
    const rect = this.minuteSvg.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left - 100;
    const y = event.clientY - rect.top - 100;

    // Calculate angle from center using atan2
    let angle = Math.atan2(y, x);

    // Rotate so that 12 o'clock is 0 degrees
    angle = angle - Math.PI / 2;

    // Normalize to positive angle [0, 2π)
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    // Convert to degrees
    const degrees = angle * (180 / Math.PI);

    // Use stable midpoint rounding to nearest 6-degree segment
    const rounded = Math.floor((degrees + 3) / 6) % 60;

    this.selectedMinute = rounded <= 30 ? rounded + 30 : rounded - 30;
  }

  private emitValue(): void {
    const hour24 = (this.selectedHour % 12) + (this.isPM ? 12 : 0);
    const formatted = `${hour24.toString().padStart(2, '0')}:${this.selectedMinute
      .toString()
      .padStart(2, '0')}`;

    this.changed(formatted);
  }
}
