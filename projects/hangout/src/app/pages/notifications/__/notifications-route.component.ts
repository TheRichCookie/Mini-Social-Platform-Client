import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'hang-notifications-route',
  imports: [RouterModule],
  templateUrl: './notifications-route.component.html',
  styleUrls: ['./notifications-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangNotificationsRouteComponent {}
