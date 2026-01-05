import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import type {
  CommonResponseViewModel,
  HasUnreadNotificationsData,
  UkWorldUtcTime,
} from '@utils/ui-kit/definitions';
import {
  UkAlertService,
  UkAppService,
  UkNotificationService,
} from '@utils/ui-kit/services';
import {catchError, exhaustMap, of, switchMap} from 'rxjs';

@Injectable()
export class HangAppEffects {
  private readonly actions = inject(Actions);
  private readonly appService = inject(UkAppService);
  private readonly notificationService = inject(UkNotificationService);
  private readonly alertService = inject(UkAlertService);

  public getCurrentTime$ = createEffect(() => {
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

  public getHasNotification$ = createEffect(() => {
    return this.actions.pipe(
      ofType(APP_ACTIONS.GET_HAS_NOTIFICATION),
      exhaustMap((_props) =>
        this.notificationService.getHasUnread().pipe(
          switchMap(
            (res: CommonResponseViewModel<HasUnreadNotificationsData>) => {
              if (res.code === 200 && res.data) {
                return of(
                  APP_ACTIONS.UPDATE_HAS_NOTIFICATION({
                    response: res.data,
                  }),
                );
              }

              if (res.code === 500 && res.message) {
                this.alertService.error(res.message);
              }

              return of(
                APP_ACTIONS.UPDATE_HTTP_FAIL({
                  timestamp: Date.now(),
                  methodName: 'getHasNotification',
                  error: res.message ?? '',
                }),
              );
            },
          ),
          catchError((error: unknown) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getHasNotification',
                error: error as string,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
