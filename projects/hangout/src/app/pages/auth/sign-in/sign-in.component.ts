import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {APP_ROUTES} from '@app/app.routes';
import {Store} from '@ngrx/store';
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
  UkIconComponent,
  UkImageComponent,
  UkLinkComponent,
  UkTextComponent,
} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkInputComponent} from '@utils/ui-kit/forms';
import {UkAlertService} from '@utils/ui-kit/services';

import type {HangAuthStatus, HangSignInForm} from '../_models/auth.model';
import {SELECT_AUTH_SIGN_IN_RECEIVED_TIME_RESPONSE} from '../_store/auth.selectors';

@Component({
  standalone: true,
  selector: 'hang-sign-in',
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
    UkIconComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangSignInComponent {
  private readonly store = inject(Store);
  private readonly alertService = inject(UkAlertService);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public readonly UK_TYPE = UK_TYPE;
  public readonly APP_ROUTES = APP_ROUTES;
  public mobileInputErrorMessage = '';
  public signInFormSubmitted = false;
  public showPassword = false;

  public status: HangAuthStatus = 'EMPTY';

  public signInForm = new FormGroup<HangSignInForm>({
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
      .select(SELECT_AUTH_SIGN_IN_RECEIVED_TIME_RESPONSE)
      .pipe(takeUntilDestroyed())
      .subscribe((receivedTime) => {
        if (receivedTime) {
          void this.router.navigate([
            `/${APP_ROUTES.AUTH.ROOT}/${APP_ROUTES.AUTH.CHILDREN.OTP}`,
          ]);
        }
      });
  }

  public onSubmit(): void {
    this.signInFormSubmitted = true;

    if (this.signInForm.invalid) {
      this.status = 'ERROR';
      this.changeDetectorRef.markForCheck();

      return;
    }

    const REQUEST = this.signInForm.getRawValue();

    this.store.dispatch(
      AUTH_ACTIONS.SIGN_IN_ACTIONS.$SIGN_IN_POST({request: REQUEST}),
    );
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
