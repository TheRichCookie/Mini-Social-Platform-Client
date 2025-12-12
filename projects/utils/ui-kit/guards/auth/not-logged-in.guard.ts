import {inject} from '@angular/core';
import type {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import {Router} from '@angular/router';
import {UkAlertService, UkAuthenticateService} from '@utils/ui-kit/services';

export const BmnNotLoggedInGuard: CanActivateFn = async (
  _activatedRouteSnapshot: ActivatedRouteSnapshot,
  _routerStateSnapshot: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const alertService = inject(UkAlertService);
  const authenticateService = inject(UkAuthenticateService);
  const isUserAuthorized = await authenticateService.isUserAuthorized();

  if (isUserAuthorized) {
    alertService.info('شما قبلا وارد سیستم شدید');
    void router.navigateByUrl('/auth/logout').then(() => {});

    return false;
  }

  return true;
};
