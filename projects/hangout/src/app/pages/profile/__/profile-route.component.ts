import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'hang-profile-route',
  imports: [RouterModule],
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfileRouteComponent {}
