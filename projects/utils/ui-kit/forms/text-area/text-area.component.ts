import {CommonModule} from '@angular/common';
import type {ElementRef} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  ViewChild,
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

  @ViewChild('textarea')
  public textarea!: ElementRef;

  @Input()
  public placeholder = '';

  @Input()
  public borderColor: InputBorderColor = DEFAULT.textArea.borderColor;

  @Input()
  public value?: unknown;

  public readonly UK_TYPE = UK_TYPE;
  public isDisabled = false;

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public onBlur(): void {
    this.touched();
  }

  public onChange(): void {
    const textarea = this.textarea.nativeElement as HTMLTextAreaElement;

    textarea.style.height = 'auto'; // reset
    textarea.style.height = `${textarea.scrollHeight}px`;
    this.changed(this.value);
  }

  public writeValue(value: boolean): void {
    this.value = value;
    // setTimeout(() => {
    //   this.onChange();
    // });
    this.changeDetectorRef.markForCheck();
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
}
