import type {HangAuthState} from '@app/pages/auth/_store/auth.state';
import type {HangFeedState} from '@app/pages/home/_store/feed.state';
import type {HangNotificationsState} from '@app/pages/notifications/_store/notifications.state';
import type {HangPostState} from '@app/pages/post/_store/post.state';
import type {HangProfileState} from '@app/pages/profile/_store/profile.state';
import type {HangSearchState} from '@app/pages/search/_store/search.state';

import type {HangAppState} from '../app/app.state';
import type {HangRouterState} from '../router/router.state';

export interface HangBaseState {
  app: HangAppState;
  auth: HangAuthState;
  feed: HangFeedState;
  search: HangSearchState;
  profile: HangProfileState;
  notifications: HangNotificationsState;
  post: HangPostState;
  router: HangRouterState;
}
