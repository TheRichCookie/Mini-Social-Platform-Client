import type {HangRoutes} from '@app/layouts/general/_/typed.route';
import {HangNotificationsRouteComponent} from '@app/pages/notifications/__/notifications-route.component';

import {HangNotificationsPageComponent} from '../notifications-page/notifications-page.component';

export const NOTIFICATIONS_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangNotificationsRouteComponent,
    children: [
      {
        path: '',
        component: HangNotificationsPageComponent,
      },
    ],
  },
];
