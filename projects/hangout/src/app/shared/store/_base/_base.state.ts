import type {HangAuthState} from '@app/pages/auth/_store/auth.state';

import type {HangAppState} from '../app/app.state';
import type {HangRouterState} from '../router/router.state';

export interface HangBaseState {
  app: HangAppState;
  auth: HangAuthState;
  router: HangRouterState;
}
