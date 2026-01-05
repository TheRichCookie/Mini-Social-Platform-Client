import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'hang-home-route',
  imports: [RouterModule],
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangHomeRouteComponent {}
