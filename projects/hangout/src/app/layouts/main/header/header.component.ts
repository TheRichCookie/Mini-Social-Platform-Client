import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UkTextComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkOverlayService} from '@utils/ui-kit/services';

@Component({
  standalone: true,
  selector: 'hang-header',
  imports: [UkTextComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UkOverlayService],
})
export class HangHeaderComponent {
  public readonly UK_TYPE = UK_TYPE;
}
