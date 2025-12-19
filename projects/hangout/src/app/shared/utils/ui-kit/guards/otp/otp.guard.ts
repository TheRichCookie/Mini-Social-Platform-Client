import {inject} from '@angular/core';
import {
  type ActivatedRouteSnapshot,
  type CanActivateFn,
  RedirectCommand,
  Router,
  type RouterStateSnapshot,
} from '@angular/router';
import {APP_ROUTES} from '@app/app.routes';
import {SELECT_AUTH_SIGN_IN_RECEIVED_TIME_RESPONSE} from '@app/pages/auth/_store/auth.selectors';
import {Store} from '@ngrx/store';
import {map, take} from 'rxjs';

export const HangOtpGuard: CanActivateFn = (
  _activatedRouteSnapshot: ActivatedRouteSnapshot,
  _routerStateSnapshot: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const store = inject(Store);

  const URL = router.parseUrl(
    `/${APP_ROUTES.AUTH.ROOT}${APP_ROUTES.AUTH.CHILDREN.SIGN_IN}`,
  );

  return store.select(SELECT_AUTH_SIGN_IN_RECEIVED_TIME_RESPONSE).pipe(
    map((receivedTime) => {
      if (!receivedTime) {
        return new RedirectCommand(URL, {skipLocationChange: false});
      } else {
        return true;
      }
    }),
    take(1),
  );
};
