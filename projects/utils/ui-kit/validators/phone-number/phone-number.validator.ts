import { Injectable } from '@angular/core';
import type {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
// import {MobilePhoneNumberService} from 'ngx-persian';

@Injectable({
  providedIn: 'root',
})
export class UkPhoneNumberValidatorService {
  // constructor(private readonly mobilePhoneNumberService: MobilePhoneNumberService) {}

  public phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;

      if (!value) {
        return null;
      }

      if (!value.startsWith('0')) {
        value = `0${value}`;
      }

      if ((value as string).length < 10) {
        return null;
      }

      // if (!this.mobilePhoneNumberService.isPhoneNumberPatternValid(value)) {
      //     return {phoneNumber: true};
      // }

      return null;
    };
  }
}
