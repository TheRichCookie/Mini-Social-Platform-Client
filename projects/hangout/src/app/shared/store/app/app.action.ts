import {createAction, props} from '@ngrx/store';
import type {
  HasUnreadNotificationsData,
  UkWorldUtcTime,
} from '@utils/ui-kit/definitions';

import type {HangAppLoading} from '../_/models/app-loading.interface';
import type {HangAppState} from './app.state';

// reset
export const RESET_STATE = createAction('[APP] RESET_STATE');

// general
export const UPDATE_APP_BY_RESET = createAction('[APP] UPDATE_APP_BY_RESET');
export const UPDATE_APP_BY_REPLACE = createAction(
  '[APP] UPDATE_APP_BY_REPLACE',
  props<{app: HangAppState}>(),
);

// layout
export const UPDATE_LAYOUT_SHOW_TABS = createAction(
  '[APP] UPDATE_LAYOUT_SHOW_TABS',
  props<{status: boolean}>(),
);

export const UPDATE_LAYOUT_SHOW_HEADER = createAction(
  '[APP] UPDATE_LAYOUT_SHOW_HEADER',
  props<{status: boolean}>(),
);

export const UPDATE_HEADER_TITLE = createAction(
  '[APP] UPDATE_HEADER_TITLE',
  props<{
    title: string;
  }>(),
);

// loading
export const LOADING = createAction(
  '[APP] LOADING',
  props<{
    part: HangAppLoading;
    status: boolean;
  }>(),
);

// test
export const GET_CURRENT_UTC_TIME = createAction('[APP] GET_CURRENT_UTC_TIME');
export const UPDATE_GET_CURRENT_UTC_TIME = createAction(
  '[APP] UPDATE_GET_CURRENT_UTC_TIME',
  props<{
    currentUtcTime: UkWorldUtcTime;
  }>(),
);

// common
export const EMPTY_ACTION = createAction('[APP] Empty Action');
export const UPDATE_HTTP_FAIL = createAction(
  '[APP] UPDATE_HTTP_FAIL',
  props<{
    timestamp: number;
    methodName: string;
    error: string;
  }>(),
);
export const UPDATE_LOADING = createAction(
  '[APP] UPDATE_LOADING',
  props<{
    part: HangAppLoading;
    status: boolean;
  }>(),
);
//

// notification
export const GET_HAS_NOTIFICATION = createAction('[APP] GET_HAS_NOTIFICATION');
export const UPDATE_HAS_NOTIFICATION = createAction(
  '[APP] UPDATE_HAS_NOTIFICATION',
  props<{
    response: HasUnreadNotificationsData;
  }>(),
);
