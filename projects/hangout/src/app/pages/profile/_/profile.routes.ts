import type {HangRoutes} from '@app/layouts/general/_/typed.route';

import {HangProfileComponent} from '../__/profile.component';
import {HangProfilePageComponent} from '../profile-page/profile-page.component';

export const PROFILE_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangProfileComponent,
    children: [
      {
        path: '',
        component: HangProfilePageComponent,
      },
    ],
  },
];
