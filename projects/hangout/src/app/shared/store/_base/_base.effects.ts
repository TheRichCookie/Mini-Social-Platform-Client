import {HangAuthEffects} from '@app/pages/auth/_store/auth.effects';

import {HangAppEffects} from '../app/app.effect';

export const BASE_EFFECTS = [HangAppEffects, HangAuthEffects];
