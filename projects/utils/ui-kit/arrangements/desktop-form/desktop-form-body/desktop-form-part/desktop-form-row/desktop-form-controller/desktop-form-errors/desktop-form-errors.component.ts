import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {ValidationErrors} from '@angular/forms';
import {UkTextComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';

export enum UkErrorTypes {
  EMAIL = 'email',
  IRANIAN_BANK_CARD_IBAN_NUMBER = 'iranianBankCardIbanNumber',
  IRANIAN_BANK_CARD_NUMBER = 'iranianBankCardNumber',
  MINLENGTH = 'minlength',
  NATIONAL_CODE = 'nationalCode',
  NOT_UNIQUE = 'notUnique',
  PATTERN = 'pattern',
  PHONE_NUMBER = 'phoneNumber',
  REQUIRED = 'required',
  VALUE_SHOULD_BE_GREATER = 'valueShouldBeGreater',
  NOT_ALL_ZERO = 'notAllZero',
  INVALID_FORMAT = 'invalidFormat',
  SIZE_LIMIT = 'sizeLimit',
}

export type ErrorTypes = `${UkErrorTypes}`;

@Component({
  standalone: true,
  selector: 'uk-desktop-form-errors',
  imports: [CommonModule, UkTextComponent],
  templateUrl: './desktop-form-errors.component.html',
  styleUrl: './desktop-form-errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkDesktopFormErrorsComponent {
  @Input()
  public errors: ValidationErrors | null = null;

  @Input()
  public errorMessages: Partial<Record<
    ErrorTypes,
    string | ((error: unknown) => string)
  > | null> = null;

  public readonly UK_ERRORS = UkErrorTypes;
  public readonly UK_TYPE = UK_TYPE;

  public readonly ERROR_FG_COLOR = this.UK_TYPE.TEXT.FG_COLOR.CONTENT_ERROR;
  public readonly ERROR_TYPOGRAPHY = this.UK_TYPE.TEXT.TYPOGRAPHY.BODY_1;

  public getErrorMessages(): string[] {
    if (!this.errors) {
      return [];
    }

    return Object.entries(this.errors).map(([key, errorValue]) => {
      const msgTemplate = this.errorMessages?.[key as ErrorTypes];

      if (typeof msgTemplate === 'function') {
        return msgTemplate(errorValue);
      }

      if (typeof msgTemplate === 'string') {
        return msgTemplate;
      }

      return '';
    });
  }
}
