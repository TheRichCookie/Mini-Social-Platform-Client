import {HangAuthEffects} from '@app/pages/auth/_store/auth.effects';
import {HangProfileEffects} from '@app/pages/profile/_store/profile.effects';

import {HangAppEffects} from '../app/app.effect';

export const BASE_EFFECTS = [
  HangAppEffects,
  HangAuthEffects,
  // HangFeedEffects,
  // HangSearchEffects,
  HangProfileEffects,
  // HangNotificationsEffects,
];
