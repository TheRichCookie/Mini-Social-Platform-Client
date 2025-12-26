import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import { UK_TYPE } from '@utils/ui-kit/definitions';
import { UkNotificationService, UkSocketService } from '@utils/ui-kit/services';
import type { NotificationModel } from '@utils/ui-kit/definitions/swagger/notification.dto';

@Component({
  selector: 'hang-notifications-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UkPagePartComponent,
    UkPageBodyComponent,
    UkPageComponent,
  ],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangNotificationsPageComponent {
  public readonly UK_TYPE = UK_TYPE;

  private readonly notificationService = inject(UkNotificationService);
  private readonly socketService = inject(UkSocketService);

  public notifications = signal<NotificationModel[]>([]);

  constructor() {
    this.loadNotifications();

    this.socketService.notification$.subscribe((n) => {
      if (!n) return;
      // prepend incoming notification
      const current = this.notifications();
      const notif: Partial<NotificationModel> = {
        _id: String(Date.now()),
        type: n.type,
        senderId: n.senderId,
        postId: n.postId,
        isRead: false,
        createdAt: new Date().toISOString(),
      };

      this.notifications.set([notif as NotificationModel, ...current]);
    });
  }

  private loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((res: any) => {
      if (res?.data) this.notifications.set(res.data as NotificationModel[]);
    });
  }

  public markAsRead(n: NotificationModel): void {
    if (n.isRead) return;

    this.notificationService.markAsRead(n._id).subscribe(() => {
      const current = [...this.notifications()];
      const idx = current.findIndex((x) => x._id === n._id);
      if (idx === -1) return;
      const copy = { ...current[idx], isRead: true };
      current[idx] = copy;
      this.notifications.set(current);
    });
  }
}
