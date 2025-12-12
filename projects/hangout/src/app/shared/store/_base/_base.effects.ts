import {HangAuthEffects} from '@app/pages/auth/_store/auth.effect';

import {HangAppEffects} from '../app/app.effect';

export const BASE_EFFECTS = [HangAppEffects, HangAuthEffects];
