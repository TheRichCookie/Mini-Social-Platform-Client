import type {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { UkCustomValidationErrors } from '@utils/ui-kit/definitions';

export function ukValueTrueValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value !== true) {
      return { [UkCustomValidationErrors.VALUE_TRUE_REQUIRED]: true }; // Custom error key
    }

    return null;
  };
}
