import { createAction, props } from '@ngrx/store';
import type { CommonErrorResponse } from '@utils/ui-kit/definitions';

// general
export const SET_USER_DATA = createAction(
  '[USER] GET_USER_DATA',
  props<{
    partnerId: number;
    fromShopPage?: boolean;
  }>(),
);

export const UPDATE_USER_DATA_ERROR = createAction(
  '[USER] UPDATE_USER_DATA_ERROR',
  props<{
    error: CommonErrorResponse;
  }>(),
);

// reset
export const RESET_STATE = createAction('[USER] RESET_STATE');
