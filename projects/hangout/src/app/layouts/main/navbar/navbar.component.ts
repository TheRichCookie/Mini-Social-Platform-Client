import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from '@app/app.routes';
import {UkIconComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'hang-navbar',
  imports: [RouterModule, UkIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangNavBarComponent {
  public readonly UK_TYPE = UK_TYPE;
  public readonly APP_ROUTES = APP_ROUTES;
}
