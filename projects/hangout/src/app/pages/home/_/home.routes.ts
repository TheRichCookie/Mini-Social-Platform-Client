import type {HangRoutes} from '@app/layouts/general/_/typed.route';

import {HangHomeComponent} from '../__/home.component';
import {HangHomePageComponent} from '../home-page/home-page.component';

export const HOME_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangHomeComponent,
    children: [
      {
        path: '',
        data: {
          seo: {
            title: '',
          },
        },
        component: HangHomePageComponent,
      },
    ],
  },
];
