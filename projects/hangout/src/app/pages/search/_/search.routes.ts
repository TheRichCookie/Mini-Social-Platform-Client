import type { HangRoutes } from '@app/layouts/general/_/typed.route';

import { HangSearchComponent } from '../__/search.component';
import { HangSearchPageComponent } from '../search-page/search-page.component';

export const SEARCH_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangSearchComponent,
    children: [
      {
        path: '',
        component: HangSearchPageComponent,
      },
    ],
  },
];
