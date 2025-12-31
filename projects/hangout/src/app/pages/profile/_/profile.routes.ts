import type {HangRoutes} from '@app/layouts/general/_/typed.route';

import {HangProfilePageComponent} from '../profile-page/profile-page.component';

export const PROFILE_ROUTES: HangRoutes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HangProfilePageComponent,
      },
      {
        path: ':id',
        component: HangProfilePageComponent,
      },
    ],
  },
];
