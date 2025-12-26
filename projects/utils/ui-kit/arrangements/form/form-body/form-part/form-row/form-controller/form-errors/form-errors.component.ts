import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {ValidationErrors} from '@angular/forms';

import {UkTextComponent} from '../../../../../../../components/text/text.component';
import {
  UK_TYPE,
  UkCustomIranianBankCardNumberErrors,
  UkCustomNationalCodeErrors,
  UkCustomValidationErrors,
} from '../../../../../../../definitions';

@Component({
  standalone: true,
  selector: 'uk-form-errors',
  imports: [CommonModule, UkTextComponent],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormErrorsComponent {
  @Input()
  public errors: ValidationErrors | null = null;

  public readonly UK_TYPE = UK_TYPE;
  public readonly CUSTOM_VALIDATION_ERRORS = UkCustomValidationErrors;
  public readonly CUSTOM_NATIONAL_CODE_ERRORS = UkCustomNationalCodeErrors;
  public readonly CUSTOM_IRANIAN_BANK_CARD_NUMBER_ERRORS =
    UkCustomIranianBankCardNumberErrors;

  public readonly ERROR_FG_COLOR = this.UK_TYPE.TEXT.FG_COLOR.CONTENT_ERROR;
  public readonly ERROR_TYPOGRAPHY = this.UK_TYPE.TEXT.TYPOGRAPHY.BODY_1;
}
