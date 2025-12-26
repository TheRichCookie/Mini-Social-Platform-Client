import type {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import type {Observable} from 'rxjs';

export interface UkHttpErrorHandler {
  handleError(
    request: HttpRequest<unknown>,
    err: HttpErrorResponse,
  ): Observable<HttpResponse<unknown>>;
}

export interface UkMatchableHttpErrorHandler extends UkHttpErrorHandler {
  matcher(err: HttpErrorResponse): boolean;
}
