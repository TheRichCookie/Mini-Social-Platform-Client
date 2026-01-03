import {HangAuthEffects} from '@app/pages/auth/_store/auth.effects';
import {HangPostEffects} from '@app/pages/post/_store/post.effects';
import {HangProfileEffects} from '@app/pages/profile/_store/profile.effects';
import {HangSearchEffects} from '@app/pages/search/_store/search.effects';

import {HangAppEffects} from '../app/app.effect';

export const BASE_EFFECTS = [
  HangAppEffects,
  HangAuthEffects,
  // HangFeedEffects,
  HangSearchEffects,
  HangProfileEffects,
  HangPostEffects,
  // HangNotificationsEffects,
];
