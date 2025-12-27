import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from '@app/app.routes';
import {UkIconComponent} from '@utils/ui-kit/components';
import {UkBadgeComponent} from '@utils/ui-kit/components/badge/badge.component';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {Store} from '@ngrx/store';
import {SELECT_NOTIFICATIONS_UNREAD_COUNT} from '@app/pages/notifications/_store/notifications.selectors';

@Component({
  standalone: true,
  selector: 'hang-navbar',
  imports: [RouterModule, UkIconComponent, UkBadgeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangNavBarComponent {
  public readonly UK_TYPE = UK_TYPE;
  public readonly APP_ROUTES = APP_ROUTES;

  private readonly store = inject(Store);

  public readonly unreadCount$ = this.store.select(SELECT_NOTIFICATIONS_UNREAD_COUNT);
}
