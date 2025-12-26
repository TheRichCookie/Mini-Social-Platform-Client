import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type {
  CrudMode,
  InputBorderColor,
  InputMode,
  InputNumeric,
  InputType,
  InputTypography,
} from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
  UkInputMode,
} from '@utils/ui-kit/definitions';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  standalone: true,
  selector: 'uk-input',
  imports: [FormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkInputComponent),
      multi: true,
    },
  ],
})
export class UkInputComponent implements ControlValueAccessor {
  private _inputMode: InputMode = DEFAULT.input.inputMode;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public numberPattern: 'ENGLISH_PERSIAN_NUMBER' | null = null;

  @Input()
  public inputType: InputType = DEFAULT.input.type;

  @Input()
  public placeholder = '';

  @Input()
  public mask = '';

  @Input()
  public thousandSeparator = '';

  @Input()
  public borderColor: InputBorderColor = DEFAULT.input.borderColor;

  @Input()
  public typography: InputTypography = DEFAULT.input.typography;

  // @Input()
  // public value: any;

  @Input()
  public isDisabled = false;

  @Input()
  public numeric: InputNumeric = DEFAULT.input.numeric;

  @Input()
  public crudMode: CrudMode = DEFAULT.input.crudMode;

  @Input()
  public maxLength!: number;

  @Input()
  public minLength!: number;

  @Input()
  public isConvertPersianToEnglishDigit = false;

  public currentInputMode!: string;
  public readonly UK_TYPE = UK_TYPE;

  public val!: unknown;

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  constructor() {
    this.currentInputMode = this.getInputMode(DEFAULT.input.inputMode);
  }

  @Input()
  public set inputMode(v: InputMode) {
    this._inputMode = v;
    this.currentInputMode = this.getInputMode(v);
    this.changeDetectorRef.markForCheck();
  }

  public get inputMode(): InputMode {
    return this._inputMode;
  }

  public get customPattern(): Record<
    string,
    { pattern: RegExp; optional?: boolean; symbol?: string }
  > {
    if (this.numberPattern === 'ENGLISH_PERSIAN_NUMBER') {
      return {
        D: { pattern: /[0-9\u06F0-\u06F9]/ }, // 0-9 + Persian digits
      };
    }

    return null!;
  }

  public onBlur(): void {
    this.touched();
  }

  public onChange(input: unknown): void {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    let val = input?.toString() || '';

    if (this.isConvertPersianToEnglishDigit) {
      val = this.allowOnlyDigits(val);
      val = this.persianToEnglishDigits(val);
    }

    this.changed(val);
  }

  public writeValue(value: unknown): void {
    this.val = value;
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public getInputMode(mode: InputMode): string {
    let currentMode = '';

    switch (mode as UkInputMode) {
      case UkInputMode.NULL:
        currentMode = null!;
        break;
      case UkInputMode.NUMERIC:
        currentMode = 'numeric';
        break;
      case UkInputMode.TEL:
        currentMode = 'tel';
        break;
      case UkInputMode.TEXT:
        currentMode = 'text';
        break;
      default:
        currentMode = '';
        break;
    }

    return currentMode;
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (!this.isConvertPersianToEnglishDigit) {
      return;
    }

    const allowed = /[0-9۰-۹]/;

    if (
      event.key.length === 1 &&
      !allowed.test(event.key) &&
      !this.isControlKey(event)
    ) {
      event.preventDefault();
    }
  }

  public isControlKey(event: KeyboardEvent): boolean {
    const ctrlKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

    return ctrlKeys.includes(event.key);
  }

  public allowOnlyDigits(input: string): string {
    return input.replaceAll(/[^0-9۰-۹]/g, '');
  }

  public persianToEnglishDigits(input: string): string {
    if (!input) {
      return '';
    }

    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';

    return input.replaceAll(/[۰-۹]/g, (char) => {
      const index = persianDigits.indexOf(char);

      return index > -1 ? englishDigits[index] : char;
    });
  }

  public setDisabledState(disabled: boolean): void {
    this.isDisabled = disabled;
    this.changeDetectorRef.markForCheck();
  }
}
