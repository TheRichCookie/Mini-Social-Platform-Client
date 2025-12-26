import { inject } from '@angular/core';
import type {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { RedirectCommand, Router } from '@angular/router';
import { UkAlertService, UkAuthenticateService } from '@utils/ui-kit/services';

export const UkNotLoggedInGuard: CanActivateFn = async (
  _activatedRouteSnapshot: ActivatedRouteSnapshot,
  _routerStateSnapshot: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const alertService = inject(UkAlertService);
  const authenticateService = inject(UkAuthenticateService);
  const isUserAuthorized = await authenticateService.isUserAuthorized();

  const URL = router.parseUrl('/auth/logout');

  if (isUserAuthorized) {
    alertService.info('شما قبلا وارد سیستم شدید');

    return new RedirectCommand(URL, { skipLocationChange: false });
  }

  return true;
};
