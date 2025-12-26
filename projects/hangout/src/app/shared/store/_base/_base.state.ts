import type { HangAuthState } from '@app/pages/auth/_store/auth.state';

import type { HangAppState } from '../app/app.state';
import type { HangRouterState } from '../router/router.state';
import type { HangUserState } from '../user/user.state';

export interface HangBaseState {
  app: HangAppState;
  auth: HangAuthState;
  router: HangRouterState;
  user: HangUserState;
}
