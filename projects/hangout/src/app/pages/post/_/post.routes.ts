import type {HangRoutes} from '@app/layouts/general/_/typed.route';

import {HangPostRouteComponent} from '../__/post-route.component';
import {HangPostPageComponent} from '../post-page/post-page.component';

export const POST_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangPostRouteComponent,
    children: [
      {
        path: '',
        component: HangPostPageComponent,
      },
    ],
  },
];
