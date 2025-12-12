import {APP_ROUTES} from '@app/app.routes';
import type {HangRoutes} from '@app/layouts/general/_/typed.route';
import {BmnUsersGuard} from '@utils/ui-kit/guards';

import {HangMainLayoutComponent} from '../__/main-layout.component';

export const MAIN_LAYOUT_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangMainLayoutComponent,
    children: [
      {
        path: APP_ROUTES.HOME.ROOT,
        loadChildren: async () =>
          import('../../../pages/home/_/home.routes').then(
            (r) => r.HOME_ROUTES,
          ),
        canActivate: [BmnUsersGuard],
      },
      {
        path: '',
        redirectTo: APP_ROUTES.HOME.ROOT,
        pathMatch: 'full',
      },
      {path: '**', redirectTo: APP_ROUTES.HOME.ROOT, pathMatch: 'full'},
    ],
  },
];
