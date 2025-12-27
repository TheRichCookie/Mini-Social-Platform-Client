import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import {UkNotificationService, UkSocketService} from '@utils/ui-kit/services';
import {catchError, exhaustMap, filter, map, of, switchMap} from 'rxjs';

import type {NotificationModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import {NOTIFICATIONS_ACTIONS} from './notifications.actions';

@Injectable({providedIn: 'root'})
export class HangNotificationsEffects {
  private readonly actions = inject(Actions);
  private readonly notificationService = inject(UkNotificationService);
  private readonly socketService = inject(UkSocketService);

  public socketNotifications$ = createEffect(() => {
    return this.socketService.notification$.pipe(
      filter((p) => !!p),
      map((payload: unknown) => {
        const p = payload as Record<string, unknown>;

        const notification: NotificationModel = {
          _id: (p['_id'] as string | undefined) ?? undefined,
          userId: (p['userId'] as string | undefined) ?? undefined,
          senderId: (p['senderId'] as string | undefined) ?? undefined,
          type: (p['type'] as NotificationModel['type']) ?? undefined,
          postId: (p['postId'] as string | undefined) ?? undefined,
          isRead: (p['isRead'] as boolean | undefined) ?? false,
          createdAt:
            (p['createdAt'] as string | undefined) ?? new Date().toISOString(),
        };

        return NOTIFICATIONS_ACTIONS.$RECEIVED_NOTIFICATION_UPDATE({
          notification,
          receivedTime: Date.now(),
        });
      }),
    );
  });

  public getNotifications$ = createEffect(() => {
    return this.actions.pipe(
      ofType(NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS),
      exhaustMap(() =>
        this.notificationService.getNotifications().pipe(
          map((res) => {
            if (res.code === 200) {
              return NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS_UPDATE({
                notifications: res.data ?? [],
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
                error,
              }),
            ),
          ),
        ),
      ),
    );
  });

  public markAsRead$ = createEffect(() => {
    return this.actions.pipe(
      ofType(NOTIFICATIONS_ACTIONS.$MARK_AS_READ),
      switchMap(({id}) =>
        this.notificationService.markAsRead(id).pipe(
          map(() => NOTIFICATIONS_ACTIONS.$MARK_AS_READ_UPDATE({id})),
          catchError((error) =>
            of(
              NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS_ERROR({
                error: {message: String(error), receivedTime: Date.now()},
              }),
            ),
          ),
        ),
      ),
    );
  });
}
