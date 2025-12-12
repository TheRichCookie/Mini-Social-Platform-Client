import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  selector: 'hang-home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangHomeComponent {
  public readonly UK_TYPE = UK_TYPE;
}
