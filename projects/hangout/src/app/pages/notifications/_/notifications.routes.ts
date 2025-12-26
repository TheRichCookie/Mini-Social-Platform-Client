import type { HangRoutes } from '@app/layouts/general/_/typed.route';

import { HangNotificationsPageComponent } from '../notifications-page/notifications-page.component';

export const NOTIFICATIONS_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangNotificationsPageComponent,
  },
];
