import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import type { UkWorldUtcTime } from '@utils/ui-kit/definitions';
import { UkAppService } from '@utils/ui-kit/services';
import { catchError, exhaustMap, of, switchMap } from 'rxjs';

@Injectable()
export class HangAppEffects {
  private readonly actions = inject(Actions);
  private readonly appService = inject(UkAppService);

  protected getCurrentTime$ = createEffect(() => {
    return this.actions.pipe(
      ofType(APP_ACTIONS.GET_CURRENT_UTC_TIME),
      exhaustMap((_props) =>
        this.appService.getCurrentUtcTime().pipe(
          switchMap((res: UkWorldUtcTime) => {
            return of(
              APP_ACTIONS.UPDATE_GET_CURRENT_UTC_TIME({
                currentUtcTime: res,
              }),
            );

            // if (res.code === 500) {
            //   this.alertService.error(res.message);
            // }

            // return of(
            //   APP_ACTIONS.UPDATE_HTTP_FAIL({
            //     timestamp: Date.now(),
            //     methodName: 'getCurrentTime',
            //     error: res.message,
            //   }),
            // );
          }),
          catchError((error: unknown) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getCurrentTime',
                error: error as string,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
