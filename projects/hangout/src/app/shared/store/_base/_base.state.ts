import type {HangAuthState} from '@app/pages/auth/_store/auth.state';
import type {HangProfileState} from '@app/pages/profile/_store/profile.state';

import type {HangAppState} from '../app/app.state';
import type {HangRouterState} from '../router/router.state';

export interface HangBaseState {
  app: HangAppState;
  auth: HangAuthState;
  // feed: HangFeedState;
  // search: HangSearchState;
  profile: HangProfileState;
  // notifications: HangNotificationsState;
  router: HangRouterState;
}
