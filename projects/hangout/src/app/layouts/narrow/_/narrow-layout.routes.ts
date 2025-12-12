import {APP_ROUTES} from '@app/app.routes';
import type {HangRoutes} from '@app/layouts/general/_/typed.route';

import {HangNarrowLayoutComponent} from '../__/narrow-layout.component';

export const NARROW_LAYOUT_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangNarrowLayoutComponent,
    children: [
      {
        path: APP_ROUTES.AUTH.ROOT,
        loadChildren: async () =>
          import('../../../pages/auth/_/auth.routes').then(
            (r) => r.AUTH_ROUTES,
          ),
      },
      {
        path: '',
        loadChildren: async () =>
          import('../../main/_/main-layout.routes').then(
            (r) => r.MAIN_LAYOUT_ROUTES,
          ),
      },
    ],
  },
];
