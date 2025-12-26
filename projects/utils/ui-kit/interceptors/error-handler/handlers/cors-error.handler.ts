import type { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';

import type { UkMatchableHttpErrorHandler } from '../error-handler.abstract';

@Injectable({ providedIn: 'root' })
export class UkCorsErrorHandler implements UkMatchableHttpErrorHandler {
  public handleError(
    req: HttpRequest<unknown>,
  ): Observable<HttpResponse<unknown>> {
    const ERROR_RESPONSE = new HttpErrorResponse({
      error: 'Internal Server Error',
      status: HttpStatusCode.Forbidden,
      statusText: 'Cors Error',
      url: req.url || undefined,
    });

    return throwError(() => ERROR_RESPONSE);
  }

  public matcher(err: HttpErrorResponse): boolean {
    return err.error instanceof ProgressEvent && err.status === 0;
  }
}
