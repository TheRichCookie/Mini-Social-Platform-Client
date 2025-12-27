import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {UkPageBodyComponent, UkPageComponent} from '@utils/ui-kit/arrangements';
import {UkButtonComponent} from '@utils/ui-kit/components/button/button.component';
import {UkListComponent} from '@utils/ui-kit/components/list/list.component';
import {UkTextComponent} from '@utils/ui-kit/components/text/text.component';
import {UkTileComponent} from '@utils/ui-kit/components/tile/tile.component';

import type {NotificationModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import * as NOTIF_ACTION from '../_store/notifications.actions';
import {
  SELECT_NOTIFICATIONS,
  SELECT_NOTIFICATIONS_UNREAD_COUNT,
} from '../_store/notifications.selectors';

@Component({
  standalone: true,
  selector: 'hang-notifications',
  imports: [
    CommonModule,
    UkPageComponent,
    UkPageBodyComponent,
    UkListComponent,
    UkTileComponent,
    UkTextComponent,
    UkButtonComponent,
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangNotificationsComponent implements OnInit {
  private readonly store = inject(Store);

  public readonly notifications$ = this.store.select(SELECT_NOTIFICATIONS);
  public readonly unreadCount$ = this.store.select(
    SELECT_NOTIFICATIONS_UNREAD_COUNT,
  );

  public ngOnInit(): void {
    this.store.dispatch(
      NOTIF_ACTION.NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS(),
    );
  }

  public trackByNotification(
    _: number,
    n: NotificationModel | undefined,
  ): string | undefined {
    return n?._id;
  }

  public markAsRead(id?: string): void {
    if (!id) return;
    this.store.dispatch(NOTIF_ACTION.NOTIFICATIONS_ACTIONS.$MARK_AS_READ({id}));
  }
}
