import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UkConfigApiBaseUrls } from '@utils/ui-kit/definitions';
import type { UkApiConfig } from '@utils/ui-kit/settings';
import { GENERAL_TOKEN } from '@utils/ui-kit/settings';

export const BASE_URL_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  request,
  next,
) => {
  const API_CONFIG: UkApiConfig = inject(GENERAL_TOKEN);
  const requestUrl = request.url;
  let baseUrl = '';

  if (
    request.url.startsWith('/assets/i18n') ||
    request.url.startsWith('assets/i18n')
  ) {
    return next(request);
  }

  // if (
  //   request.url.startsWith('https://api.baman.club') ||
  //   request.url.startsWith('assets/i18n')
  // ) {
  //   return next(request);
  // }

  if (request.headers.has('X-Skip-Base-URL')) {
    return next(
      request.clone({ headers: request.headers.delete('X-Skip-Base-URL') }),
    );
  }

  if (request.headers.has('X-Api-Base-Url')) {
    const BASE_URL_HEADER = request.headers.get('X-Api-Base-Url');

    if (BASE_URL_HEADER === UkConfigApiBaseUrls.COMMON) {
      baseUrl = API_CONFIG.baseUrl.common;
    }
  } else {
    baseUrl = API_CONFIG.baseUrl.common;
  }

  const BASE_URL = baseUrl.endsWith('/')
    ? baseUrl.slice(0, Math.max(0, baseUrl.length - 1))
    : baseUrl;
  const REQ_URL = requestUrl.startsWith('/')
    ? requestUrl.slice(1, requestUrl.length)
    : requestUrl;

  const API_REQ = request.clone({ url: `${BASE_URL}/${REQ_URL}` });

  return next(API_REQ);
};
