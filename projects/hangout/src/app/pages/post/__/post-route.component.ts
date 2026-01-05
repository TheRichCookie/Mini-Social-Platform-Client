import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'hang-post-route',
  imports: [RouterModule],
  templateUrl: './post-route.component.html',
  styleUrls: ['./post-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangPostRouteComponent {}
