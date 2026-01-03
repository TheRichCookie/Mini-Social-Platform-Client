import type {HangRoutes} from '@app/layouts/general/_/typed.route';

import {HangSearchRouteComponent} from '../__/search-route.component';
import {HangSearchPageComponent} from '../search-page/search-page.component';

export const SEARCH_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangSearchRouteComponent,
    children: [
      {
        path: '',
        component: HangSearchPageComponent,
      },
    ],
  },
];
