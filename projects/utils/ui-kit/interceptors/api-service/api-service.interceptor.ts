import type { HttpInterceptorFn } from '@angular/common/http';
import { CONST_CONFIG, UkConfigApiServices } from '@utils/ui-kit/definitions';

export const API_SERVICE_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  request,
  next,
) => {
  const REQUEST_URL = request.url;
  let apiService = '';

  if (request.headers.has('X-Skip-Api-Service')) {
    return next(
      request.clone({
        headers: request.headers.delete('X-Skip-Api-Service'),
      }),
    );
  }

  if (request.headers.has('x-api-service')) {
    const API_SERVICE_HEADER = request.headers.get('x-api-service');

    if (API_SERVICE_HEADER === UkConfigApiServices.AUTH) {
      apiService = CONST_CONFIG.SERVICE.AUTH;
    }

    if (API_SERVICE_HEADER === UkConfigApiServices.COMMENTS) {
      apiService = CONST_CONFIG.SERVICE.COMMENTS;
    }

    if (API_SERVICE_HEADER === UkConfigApiServices.FEED) {
      apiService = CONST_CONFIG.SERVICE.FEED;
    }

    if (API_SERVICE_HEADER === UkConfigApiServices.LIKES) {
      apiService = CONST_CONFIG.SERVICE.LIKES;
    }

    if (API_SERVICE_HEADER === UkConfigApiServices.POSTS) {
      apiService = CONST_CONFIG.SERVICE.POSTS;
    }

    if (API_SERVICE_HEADER === UkConfigApiServices.PROFILE) {
      apiService = CONST_CONFIG.SERVICE.PROFILE;
    }
  }

  const API_SERVICE = apiService.endsWith('/')
    ? apiService.slice(0, Math.max(0, apiService.length - 1))
    : apiService;
  const REQ_URL = REQUEST_URL.startsWith('/')
    ? REQUEST_URL.slice(1, REQUEST_URL.length)
    : REQUEST_URL;

  let clonedRequest = request.clone();

  if (apiService) {
    clonedRequest = request.clone({ url: `${API_SERVICE}/${REQ_URL}` });
  }

  return next(clonedRequest);
};
