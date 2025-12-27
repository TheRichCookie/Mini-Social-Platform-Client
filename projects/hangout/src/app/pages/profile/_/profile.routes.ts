import type {HangRoutes} from '@app/layouts/general/_/typed.route';
import {HangProfileComponent} from '@pages/profile/__/profile.component';

export const PROFILE_ROUTES: HangRoutes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: HangProfileComponent,
      },
      {
        path: '',
        component: HangProfileComponent,
      },
    ],
  },
];
