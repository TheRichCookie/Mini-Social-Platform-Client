import { inject } from '@angular/core';
import {
  type ActivatedRouteSnapshot,
  type CanActivateFn,
  RedirectCommand,
  Router,
  type RouterStateSnapshot,
} from '@angular/router';
import { UkAuthenticateService } from '@utils/ui-kit/services';

export const UkUsersGuard: CanActivateFn = async (
  _activatedRouteSnapshot: ActivatedRouteSnapshot,
  _routerStateSnapshot: RouterStateSnapshot,
) => {
  const authenticateService = inject(UkAuthenticateService);
  const router = inject(Router);
  const isUserAuthorized = await authenticateService.isUserAuthorized();

  const URL = router.parseUrl('/auth');

  if (!isUserAuthorized) {
    return new RedirectCommand(URL, { skipLocationChange: false });
  }

  return true;
};
