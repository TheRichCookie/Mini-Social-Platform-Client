import {APP_ROUTES} from '@app/app.routes';
import type {HangRoutes} from '@app/layouts/general/_/typed.route';
import {HangHomeComponent} from '@pages/home/__/home.component';

export const HOME_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangHomeComponent,
  },
];
