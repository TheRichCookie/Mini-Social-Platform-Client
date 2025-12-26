import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  selector: 'hang-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangAuthComponent {
  protected readonly UK_TYPE = UK_TYPE;
}
