import type {HangRoutes} from '@app/layouts/general/_/typed.route';

import {HangHomeRouteComponent} from '../__/home-route.component';
import {HangHomePageComponent} from '../home-page/home-page.component';

export const HOME_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangHomeRouteComponent,
    children: [
      {
        path: '',
        component: HangHomePageComponent,
      },
    ],
  },
];
