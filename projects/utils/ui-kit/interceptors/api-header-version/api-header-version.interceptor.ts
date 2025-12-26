import type {HttpInterceptorFn} from '@angular/common/http';
import {CONST_CONFIG, UkConfigApiVersions} from '@utils/ui-kit/definitions';

export const API_HEADER_VERSION_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  request,
  next,
) => {
  let apiVersion = '';

  if (request.headers.has('X-Api-Version')) {
    const API_VERSION_HEADER = request.headers.get('X-Api-Version');

    if (API_VERSION_HEADER === UkConfigApiVersions.V1) {
      apiVersion = CONST_CONFIG.API_VERSION.V1;
    }

    if (API_VERSION_HEADER === UkConfigApiVersions.V2) {
      apiVersion = CONST_CONFIG.API_VERSION.V2;
    }

    if (API_VERSION_HEADER === UkConfigApiVersions.V3) {
      apiVersion = CONST_CONFIG.API_VERSION.V3;
    }
  }

  let clonedRequest = request.clone();

  if (apiVersion) {
    clonedRequest = clonedRequest.clone({
      setHeaders: {
        'Mnx-ApiVersion': apiVersion,
      },
    });
  }

  return next(clonedRequest);
};
