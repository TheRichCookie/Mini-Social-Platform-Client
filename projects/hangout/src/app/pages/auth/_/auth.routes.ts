import { APP_ROUTES } from '@app/app.routes';
import type { HangRoutes } from '@app/layouts/general/_/typed.route';
import { HangOtpGuard } from '@app/shared/utils/ui-kit/guards';
import { HangAuthComponent } from '@pages/auth/__/auth.component';
import { UkNotLoggedInGuard } from '@utils/ui-kit/guards';

import { HangEnterOtpComponent } from '../enter-otp/enter-otp.component';
import { HangSignInComponent } from '../sign-in/sign-in.component';
import { HangSignUpComponent } from '../sign-up/sign-up.component';

export const AUTH_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangAuthComponent,
    children: [
      {
        path: APP_ROUTES.AUTH.CHILDREN.SIGN_IN,
        component: HangSignInComponent,
        canActivate: [UkNotLoggedInGuard],
      },
      {
        path: APP_ROUTES.AUTH.CHILDREN.SIGN_UP,
        component: HangSignUpComponent,
        canActivate: [UkNotLoggedInGuard],
      },
      {
        path: APP_ROUTES.AUTH.CHILDREN.OTP,
        component: HangEnterOtpComponent,
        canActivate: [HangOtpGuard, UkNotLoggedInGuard],
      },
      {
        path: '',
        redirectTo: APP_ROUTES.AUTH.CHILDREN.SIGN_IN,
        pathMatch: 'full',
      },
    ],
  },
];
