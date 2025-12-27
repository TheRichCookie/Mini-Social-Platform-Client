import type {HangRoutes} from '@app/layouts/general/_/typed.route';
import {HangNotificationsComponent} from '@pages/notifications/__/notifications.component';

export const NOTIFICATIONS_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangNotificationsComponent,
  },
];
