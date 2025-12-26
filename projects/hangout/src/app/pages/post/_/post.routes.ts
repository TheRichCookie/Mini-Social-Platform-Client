import type { HangRoutes } from '@app/layouts/general/_/typed.route';

import { HangPostComponent } from '../__/post.component';
import { HangPostPageComponent } from '../post-page/post-page.component';

export const POST_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangPostComponent,
    children: [
      {
        path: '',
        component: HangPostPageComponent,
      },
    ],
  },
];
