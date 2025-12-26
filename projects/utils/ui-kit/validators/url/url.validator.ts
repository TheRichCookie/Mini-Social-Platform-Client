import type {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function ukUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value.startsWith('https') || !value.includes('.io')) {
      return {url: true};
    }

    return null;
  };
}
