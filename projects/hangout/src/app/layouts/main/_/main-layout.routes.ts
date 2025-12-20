import {APP_ROUTES} from '@app/app.routes';
import type {HangRoutes} from '@app/layouts/general/_/typed.route';
import {UkUsersGuard} from '@utils/ui-kit/guards';

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
        canActivate: [UkUsersGuard],
      },
      {
        path: APP_ROUTES.POST.ROOT,
        loadChildren: async () =>
          import('../../../pages/post/_/post.routes').then(
            (r) => r.POST_ROUTES,
          ),
        canActivate: [UkUsersGuard],
      },
      {
        path: APP_ROUTES.FRIENDS.ROOT,
        loadChildren: async () =>
          import('../../../pages/friend/_/friend.routes').then(
            (r) => r.FRIEND_ROUTES,
          ),
        canActivate: [UkUsersGuard],
      },
      {
        path: APP_ROUTES.PROFILE.ROOT,
        loadChildren: async () =>
          import('../../../pages/profile/_/profile.routes').then(
            (r) => r.PROFILE_ROUTES,
          ),
        canActivate: [UkUsersGuard],
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
