import {authReducer} from '@app/pages/auth/_store/auth.reducer';
import {environment} from '@environments/environment';
import {routerReducer} from '@ngrx/router-store';
import type {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';

import {appReducer} from '../app/app.reducer';
import {userReducer} from '../user/user.reducer';
import type {HangBaseState} from './_base.state';

export const baseReducers: ActionReducerMap<HangBaseState> = {
  app: appReducer,
  auth: authReducer,
  router: routerReducer,
  user: userReducer,
};

export const metaReducers: Array<MetaReducer<HangBaseState>> =
  !environment.production ? [storeFreeze] : [];
