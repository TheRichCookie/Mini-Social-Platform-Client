import {APP_ROUTES} from '@app/app.routes';
import type {HangRoutes} from '@app/layouts/general/_/typed.route';
import {HangAuthComponent} from '@pages/auth/__/auth.component';

import {HangEnterOtpComponent} from '../enter-otp/enter-otp.component';
import {HangSignInComponent} from '../sign-in/sign-in.component';

export const AUTH_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangAuthComponent,
    children: [
      {
        path: APP_ROUTES.AUTH.CHILDREN.SIGN_IN,
        component: HangSignInComponent,
        data: {
          seo: {
            title: '',
          },
        },
        // canActivate: [UkNotLoggedInGuard],
      },
      {
        path: APP_ROUTES.AUTH.CHILDREN.OTP,
        component: HangEnterOtpComponent,
        // canActivate: [BmnNotLoggedInGuard],
        data: {
          seo: {
            title: '',
          },
        },
      },
      {
        path: '',
        redirectTo: APP_ROUTES.AUTH.CHILDREN.SIGN_IN,
        pathMatch: 'full',
      },
    ],
  },
];
