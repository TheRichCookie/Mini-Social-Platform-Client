import {inject} from '@angular/core';
import type {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import {Router} from '@angular/router';

import {UkAlertService} from '../../services/alert/alert.service';
import {UkAuthenticateService} from '../../services/authenticate/authenticate.service';

export const BmnAuthRedirectGuard: CanActivateFn = async (
  _activatedRouteSnapshot: ActivatedRouteSnapshot,
  _routerStateSnapshot: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const alertService = inject(UkAlertService);
  const authenticateService = inject(UkAuthenticateService);
  const isUserAuthorized = await authenticateService.isUserAuthorized();

  if (!isUserAuthorized) {
    alertService.info('لطفا وارد سیستم شوید');
    void router.navigateByUrl('/auth').then(() => {});

    return false;
  }

  return true;
};
