import {CommonModule} from '@angular/common';
import type {OnDestroy, OnInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  type ControlValueAccessor,
  FormBuilder,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
} from '@utils/ui-kit/definitions';
import type {NgxOtpInputComponentOptions, NgxOtpStatus} from 'ngx-otp-input';
import {NgxOtpInputComponent} from 'ngx-otp-input';

@Component({
  standalone: true,
  selector: 'uk-otp-input',
  imports: [
    CommonModule,
    NgxOtpInputComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkOtpInputComponent),
      multi: true,
    },
  ],
})
export class UkOtpInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly formBuilder: FormBuilder = new FormBuilder();
  private readonly ac = new AbortController();

  private timer!: ReturnType<typeof setTimeout>;
  @ViewChild(NgxOtpInputComponent)
  public otpInput!: NgxOtpInputComponent;

  @Input()
  public status: NgxOtpStatus | null | undefined = null;

  @Input()
  public isDisabled = false;

  @Input()
  public timeout?: number;

  @Output()
  public readonly ON_CHANGE = new EventEmitter<string>();

  @Output()
  public readonly ON_COMPLETE = new EventEmitter<string>();

  public val!: unknown;
  public otpValue = '';
  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public otpOptions: NgxOtpInputComponentOptions = {
    otpLength: 6,
    autoFocus: true,
    autoBlur: true,
    hideInputValues: false,
    // regexp: /^[0-9]+$/,
    regexp: /^[0-9\u06F0-\u06F9]+$/,
    inputMode: 'tel', // numeric | tel
  };

  public pasteFromClipboard(code: string): void {
    this.otpValue = code;
    this.changeDetectorRef.markForCheck();
  }

  public clear(): void {
    this.status = null;
    this.otpInput.reset();
    this.changeDetectorRef.markForCheck();
    this.ON_CHANGE.emit(null!);
  }

  public onOtpChange(value: string[]): void {
    this.ON_CHANGE.emit(value.join());
  }

  public otpComplete(code: string): void {
    this.ON_COMPLETE.emit(code);
  }

  public writeValue(value: boolean): void {
    if (value !== null) {
      this.val = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  public registerOnChange(fn: (x: unknown) => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.isDisabled = disabled;
  }

  public ngOnInit(): void {
    const OPTIONS: CredentialRequestOptions = {
      // otp: {transport: ['sms']},
      signal: this.ac.signal,
    };

    navigator.credentials
      .get(OPTIONS)
      .then((otp: unknown) => {
        this.pasteFromClipboard(otp as string);
      })
      .catch((_err) => {});

    if (this.timeout) {
      this.timer = setTimeout(() => {
        this.ac.abort();
      }, this.timeout);
    }
  }

  public ngOnDestroy(): void {
    this.ac.abort();

    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}

// https://levelup.gitconnected.com/detect-otps-in-your-angular-app-from-your-mobile-sms-9d5146b0f239
