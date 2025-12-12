import {inject} from '@angular/core';
import type {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import {Router} from '@angular/router';
import type {UkTokesInfo} from '@utils/ui-kit/services';
import {UkAuthenticateService} from '@utils/ui-kit/services';
import {
  UkRefreshTokenResult,
  UkRefreshTokenService,
} from '@utils/ui-kit/services/refresh-token/refresh-token.service';
import {firstValueFrom} from 'rxjs';

export const BmnUsersGuard: CanActivateFn = async (
  _activatedRouteSnapshot: ActivatedRouteSnapshot,
  _routerStateSnapshot: RouterStateSnapshot,
) => {
  const authenticateService = inject(UkAuthenticateService);
  const refreshTokenService = inject(UkRefreshTokenService);
  const router = inject(Router);
  const isUserAuthorized = await authenticateService.isUserAuthorized();

  if (!isUserAuthorized) {
    const tokesInfo: UkTokesInfo = authenticateService.getTokensInfo();

    if (!tokesInfo.refreshToken) {
      void router.navigate(['/auth']);

      return false;
    }

    const refreshTokenResult = await firstValueFrom(
      refreshTokenService.refreshToken(),
    );

    if (refreshTokenResult === UkRefreshTokenResult.FAILED) {
      refreshTokenService.refreshingFailed();

      return false;
    }

    return true;
  }

  return true;
};
