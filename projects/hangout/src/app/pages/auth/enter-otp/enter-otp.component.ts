import {CommonModule, Location} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import type {HangOtpForm} from '@pages/auth/_models/bmn-auth.model';
import * as AUTH_ACTIONS from '@pages/auth/_store/auth.action';
import {
  UkFormBodyComponent,
  UkFormComponent,
  UkFormControllerComponent,
  UkFormControllerInfoComponent,
  UkFormErrorsComponent,
  UkFormPartComponent,
  UkFormRowComponent,
  UkPageBodyComponent,
  UkPageComponent,
  UkPageFooterComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import {
  UkButtonComponent,
  UkIconComponent,
  UkImageComponent,
  UkStopWatchComponent,
  UkTextComponent,
} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkOtpInputComponent} from '@utils/ui-kit/forms';
import {UkAlertService} from '@utils/ui-kit/services';
import {NgxOtpStatus} from 'ngx-otp-input';

import {SELECT_AUTH_SIGN_IN_RESPONSE} from '../_store/auth.selector';

@Component({
  standalone: true,
  selector: 'hang-enter-otp',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UkOtpInputComponent,
    UkPageComponent,
    UkButtonComponent,
    UkIconComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    UkPageFooterComponent,
    UkFormBodyComponent,
    UkFormComponent,
    UkFormControllerComponent,
    UkFormPartComponent,
    UkFormRowComponent,
    UkStopWatchComponent,
    UkImageComponent,
    UkTextComponent,
    UkFormErrorsComponent,
    UkFormControllerInfoComponent,
  ],
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangEnterOtpComponent {
  @ViewChild(UkOtpInputComponent)
  public otpInput!: UkOtpInputComponent;

  public otpForm = new FormGroup<HangOtpForm>({
    userId: new FormControl<string>('', {
      nonNullable: true,
      validators: [],
    }),
    otp: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public readonly UK_TYPE = UK_TYPE;
  public readonly ngxOtpStatus = NgxOtpStatus;
  public readonly store = inject(Store);
  public readonly router = inject(Router);
  public readonly location = inject(Location);
  public readonly alertService = inject(UkAlertService);
  public readonly changeDetectorRef = inject(ChangeDetectorRef);
  public otpInputStatus: NgxOtpStatus | null = null;

  public otpFormSubmitted = false;
  public stopWatchStatus: 'REACHED' | 'WAIT' = 'WAIT';
  public receivedTime = Date.now();
  public duration = 300;

  constructor() {
    this.store
      .select(SELECT_AUTH_SIGN_IN_RESPONSE)
      .pipe(takeUntilDestroyed())
      .subscribe((res) => {
        if (res.userId) {
          this.otpForm.controls.userId.patchValue(res.userId, {
            emitEvent: true,
          });
        }
      });
  }

  public navigateBack(): void {
    this.location.back();
  }

  public onSubmit(): void {
    this.otpFormSubmitted = true;

    if (this.otpForm.valid) {
      const REQUEST = this.otpForm.getRawValue();

      this.store.dispatch(
        AUTH_ACTIONS.POST_OTP_AUTH({
          request: REQUEST,
        }),
      );
    }
  }

  public onComplete(code: string): void {
    this.otpForm.controls.otp.patchValue(code);
    this.onSubmit();
  }

  public onStopWatchReached(_prop: unknown): void {
    this.stopWatchStatus = 'REACHED';
  }

  public onChange(): void {
    this.otpFormSubmitted = false;
    this.otpInputStatus = null;
    this.changeDetectorRef.markForCheck();
  }
}
