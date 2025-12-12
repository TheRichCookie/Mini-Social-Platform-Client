import type {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import type {Observable} from 'rxjs';
import {catchError, takeUntil, tap, timer} from 'rxjs';

import {UkOverlayStatus} from '../../definitions';
import {
  UkLoggerPart,
  UkLoggerService,
} from './../../services/logger/logger.service';
import {UkLoaderService} from './service/loader/loader.service';

export const LOADER_INTERCEPTOR_FUNCTIONAL: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const EXCLUDED_REQUESTS: string[] = [];
  const LOADER_SERVICE: UkLoaderService = inject(UkLoaderService);
  const LOGGER_SERVICE: UkLoggerService = inject(UkLoggerService);

  // Check for exclusion conditions
  let isExcluded = false;

  EXCLUDED_REQUESTS.forEach((item) => {
    if (req.url.includes(item)) {
      isExcluded = true;
    }
  });

  if (req.headers.has('X-Api-Overlay')) {
    const API_OVERLAY_HEADER = req.headers.get('X-Api-Overlay');

    if (API_OVERLAY_HEADER === UkOverlayStatus.NONE) {
      return next(req);
    }
  }

  if (!isExcluded) {
    LOADER_SERVICE.showLoader();
    // Show loader
    LOADER_SERVICE.isLoading.next({
      totalRequests: LOADER_SERVICE['activeRequests'],
      currentRequestIndex: 0,
      percent: null!,
    });

    // Create a timer observable to manage timeout
    const TIMEOUT$ = timer(60000).pipe(
      tap(() => {
        LOADER_SERVICE.isLoading.next({
          totalRequests: 0,
          currentRequestIndex: 0,
          percent: null!,
        });
        LOGGER_SERVICE.error(
          UkLoggerPart.LOADER_INTERCEPTOR,
          `Request to ${req.url} timed out after 60 seconds.`,
          [req],
        );
      }),
    );

    // Handle the request
    return next(req).pipe(
      tap((event) => {
        if (
          event.type === HttpEventType.UploadProgress ||
          event.type === HttpEventType.DownloadProgress
        ) {
          const PERCENT_UPLOAD = Math.round(
            (100 * event.loaded) / (event.total as number),
          );

          LOADER_SERVICE.isLoading.next({
            totalRequests: LOADER_SERVICE['activeRequests'],
            currentRequestIndex: 0,
            percent: PERCENT_UPLOAD,
          });
        }

        if (event instanceof HttpResponse) {
          LOADER_SERVICE.hideLoader();
        }
      }),
      catchError((err) => {
        LOADER_SERVICE.hideLoader();
        LOGGER_SERVICE.error(
          UkLoggerPart.LOADER_INTERCEPTOR,
          `Request to ${req.url} occurred error.`,
          [err],
        );

        // return of(err); // format your error response as needed
        return next(req);
      }),
      // Complete on timeout
      takeUntil(TIMEOUT$),
    );
  }

  return next(req);
};
