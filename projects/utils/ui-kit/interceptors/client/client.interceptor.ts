import type {HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {UkPlatformsCommonService} from '@utils/ui-kit/services';
import type {UkApiConfig} from '@utils/ui-kit/settings';
import {GENERAL_TOKEN} from '@utils/ui-kit/settings';

export const CLIENT_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  request,
  next,
) => {
  const API_CONFIG: UkApiConfig = inject(GENERAL_TOKEN);
  const platformsCommonService = inject(UkPlatformsCommonService);

  if (request.headers.has('X-Skip-Client')) {
    return next(
      request.clone({
        headers: request.headers.delete('X-Skip-Client'),
      }),
    );
  }

  let clonedRequest: HttpRequest<unknown>;

  if (platformsCommonService.getPlatform() === 'ANDROID') {
    clonedRequest = request.clone({
      setHeaders: {
        'mnx-client': API_CONFIG.androidClientId,
      },
    });
  } else {
    clonedRequest = request.clone({
      setHeaders: {
        'mnx-client': API_CONFIG.clientId,
      },
    });
  }

  return next(clonedRequest);
};
