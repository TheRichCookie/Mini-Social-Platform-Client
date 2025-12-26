import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  inject,
  Input,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { UkCursor } from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-switch',
  imports: [CommonModule, FormsModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkSwitchComponent),
      multi: true,
    },
  ],
})
export class UkSwitchComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @HostBinding('attr.id')
  public externalId = '';

  @Input()
  public id = '';

  @Input()
  public cursor: UkCursor = DEFAULT.switch.cursor;

  public isDisabled = false;
  public value!: boolean;
  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public writeValue(value: boolean): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  public onChange(value: boolean): void {
    this.value = !value;
    this.changed(this.value);
    this.changeDetectorRef.markForCheck();
  }

  public onTouche(): void {
    // this.changed(value);
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }

  public switch(): void {
    this.value = !this.value;
    this.changed(this.value);
  }
}
