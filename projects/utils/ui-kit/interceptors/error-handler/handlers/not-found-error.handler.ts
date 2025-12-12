import type {HttpRequest, HttpResponse} from '@angular/common/http';
import {HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import {throwError} from 'rxjs';

import type {UkMatchableHttpErrorHandler} from '../error-handler.abstract';

@Injectable({providedIn: 'root'})
export class UkNotFoundErrorHandler implements UkMatchableHttpErrorHandler {
  public handleError(
    req: HttpRequest<unknown>,
  ): Observable<HttpResponse<unknown>> {
    const ERROR_RESPONSE = new HttpErrorResponse({
      error: 'Not Found',
      headers: req.headers,
      status: 404,
      statusText: 'Not Found',
      url: req.url || undefined,
    });

    return throwError(() => ERROR_RESPONSE);
  }

  public matcher(err: HttpErrorResponse): boolean {
    return err.status === HttpStatusCode.NotFound;
  }
}
