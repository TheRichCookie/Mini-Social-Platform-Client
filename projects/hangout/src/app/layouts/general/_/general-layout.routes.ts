import {HangGeneralLayoutComponent} from '../__/general-layout.component';
import type {HangRoutes} from './typed.route';

export const GENERAL_LAYOUT_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangGeneralLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          import('../../narrow/_/narrow-layout.routes').then(
            (r) => r.NARROW_LAYOUT_ROUTES,
          ),
      },
    ],
  },
];
