import type {MemoizedSelector} from '@ngrx/store';
import {createSelector} from '@ngrx/store';

import type {HangBaseState} from '../_base/_base.state';
import type {HangRouterState} from './router.state';

const ROUTER_STATE = (store: HangBaseState): HangRouterState => store.router;

export const SELECT_ROUTER = createSelector(
  ROUTER_STATE,
  (routerState: HangRouterState) => routerState,
);

export const SELECT_ROUTER_CURRENT_ROUTE = createSelector(
  ROUTER_STATE,
  (routerState: HangRouterState) => {
    let slugs: string[] = [];

    if (routerState.state) {
      slugs = routerState.state.url.split('/');
      slugs.shift();
    }

    return slugs;
  },
);

export const SELECT_ROUTER_CURRENT_PARAMS = createSelector(
  ROUTER_STATE,
  (routerState: HangRouterState) => routerState.state.params,
);

export const SELECT_ROUTER_CURRENT_PARAM = (
  param: string,
): MemoizedSelector<
  HangBaseState,
  string | null,
  (s1: Record<string, string>) => string | null
> | null =>
  createSelector(SELECT_ROUTER_CURRENT_PARAMS, (params) => {
    if (Object.keys(params).includes(param)) {
      return params[param];
    }

    return null;
  });
