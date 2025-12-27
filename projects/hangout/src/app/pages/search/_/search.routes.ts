import type {HangRoutes} from '@app/layouts/general/_/typed.route';
import {HangSearchComponent} from '@pages/search/__/search.component';

export const SEARCH_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangSearchComponent,
  },
];
