import type { HangRoutes } from '@app/layouts/general/_/typed.route';

import { HangFriendComponent } from '../__/friend.component';
import { HangFriendPageComponent } from '../friend-page/friend-page.component';

export const FRIEND_ROUTES: HangRoutes = [
  {
    path: '',
    component: HangFriendComponent,
    children: [
      {
        path: '',
        component: HangFriendPageComponent,
      },
    ],
  },
];
