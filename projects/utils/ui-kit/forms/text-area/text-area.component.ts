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
import type {InputBorderColor} from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-text-area',
  imports: [FormsModule, CommonModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkTextAreaComponent),
      multi: true,
    },
  ],
})
export class UkTextAreaComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  @Input()
  public placeholder = '';

  @Input()
  public borderColor: InputBorderColor = DEFAULT.textArea.borderColor;

  @Input()
  public value: unknown;

  public disabled = false;
  public readonly UK_TYPE = UK_TYPE;

  public val!: unknown;
  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public onBlur(): void {
    this.touched();
  }

  public onChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;

    textarea.style.height = 'auto'; // reset
    textarea.style.height = `${textarea.scrollHeight}px`;
    this.changed(this.val);
  }

  public writeValue(value: boolean): void {
    if (value !== null) {
      this.val = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }
}
