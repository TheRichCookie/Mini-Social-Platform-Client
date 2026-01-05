import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import {UkNotificationService} from '@utils/ui-kit/services';
import {catchError, exhaustMap, map, of} from 'rxjs';

import type {
  CommonResponseViewModel,
  NotificationPaginationData,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import {NOTIFICATIONS_ACTIONS} from './notifications.actions';

@Injectable({providedIn: 'root'})
export class HangNotificationsEffects {
  private readonly actions = inject(Actions);
  private readonly notificationService = inject(UkNotificationService);

  public getNotifications$ = createEffect(() => {
    return this.actions.pipe(
      ofType(NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS),
      exhaustMap((props) =>
        this.notificationService.getNotifications(props.query).pipe(
          map((res: CommonResponseViewModel<NotificationPaginationData>) => {
            if (res.code === 200 && res.data) {
              return NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS_UPDATE({
                query: props.query,
                response: res.data,
                receivedTime: Date.now(),
              });
            }

            return APP_ACTIONS.UPDATE_HTTP_FAIL({
              timestamp: Date.now(),
              methodName: 'getNotifications$',
              error: String(res.code),
            });
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getNotifications$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });

  public putMarkAsRead$ = createEffect(() => {
    return this.actions.pipe(
      ofType(NOTIFICATIONS_ACTIONS.$MARK_AS_READ),
      exhaustMap((props) =>
        this.notificationService.markAsRead(props.id).pipe(
          map((res: CommonResponseViewModel<void>) => {
            if (res.code === 200 && res.data) {
              return NOTIFICATIONS_ACTIONS.$MARK_AS_READ_UPDATE({
                id: props.id,
                receivedTime: Date.now(),
              });
            }

            return APP_ACTIONS.UPDATE_HTTP_FAIL({
              timestamp: Date.now(),
              methodName: 'putMarkAsRead$',
              error: String(res.code),
            });
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'putMarkAsRead$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
