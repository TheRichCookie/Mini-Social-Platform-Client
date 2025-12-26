import type { Params, RouterStateSnapshot } from '@angular/router';
import type { RouterReducerState } from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface UkRouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface UkState {
  router: RouterReducerState<UkRouterStateUrl>;
}

export class UkStoreRouteCustomSerializer extends RouterStateSerializer<UkRouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): UkRouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
