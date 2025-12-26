import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '@app/app.routes';
import { Store } from '@ngrx/store';
import * as AUTH_ACTIONS from '@pages/auth/_store/auth.actions';
import {
  UkFormBodyComponent,
  UkFormComponent,
  UkFormControllerComponent,
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
  UkImageComponent,
  UkLinkComponent,
  UkTextComponent,
} from '@utils/ui-kit/components';
import { UK_TYPE } from '@utils/ui-kit/definitions';
import { UkInputComponent } from '@utils/ui-kit/forms';
import { UkAlertService } from '@utils/ui-kit/services';

import type { HangAuthStatus, HangSignUpForm } from '../_models/bmn-auth.model';
import { SELECT_AUTH_SIGN_UP_RECEIVED_TIME_RESPONSE } from '../_store/auth.selectors';

@Component({
  standalone: true,
  selector: 'hang-sign-up',
  imports: [
    CommonModule,
    UkButtonComponent,
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    FormsModule,
    ReactiveFormsModule,
    UkFormBodyComponent,
    UkFormComponent,
    UkFormControllerComponent,
    UkFormErrorsComponent,
    UkFormPartComponent,
    UkFormRowComponent,
    UkImageComponent,
    UkInputComponent,
    UkPageFooterComponent,
    UkTextComponent,
    UkLinkComponent,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangSignUpComponent {
  private readonly store = inject(Store);
  private readonly alertService = inject(UkAlertService);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public readonly UK_TYPE = UK_TYPE;
  public readonly APP_ROUTES = APP_ROUTES;
  public mobileInputErrorMessage = '';
  public signUpFormSubmitted = false;

  public status: HangAuthStatus = 'EMPTY';

  public signUpForm = new FormGroup<HangSignUpForm>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    this.store
      .select(SELECT_AUTH_SIGN_UP_RECEIVED_TIME_RESPONSE)
      .pipe(takeUntilDestroyed())
      .subscribe((receivedTime) => {
        if (receivedTime) {
          this.alertService.success('حساب کاربری ایجاد شد.');
          void this.router.navigate([
            `/${APP_ROUTES.AUTH.ROOT}/${APP_ROUTES.AUTH.CHILDREN.SIGN_IN}`,
          ]);
        }
      });
  }

  public onSubmit(): void {
    this.signUpFormSubmitted = true;

    if (this.signUpForm.invalid) {
      this.status = 'ERROR';
      this.changeDetectorRef.markForCheck();

      return;
    }

    const REQUEST = this.signUpForm.getRawValue();

    this.store.dispatch(
      AUTH_ACTIONS.SIGN_UP_ACTIONS.$SIGN_UP_POST({ request: REQUEST }),
    );
  }
}
