import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CONST_CONFIG} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'hang-narrow-layout',
  imports: [RouterOutlet],
  templateUrl: './narrow-layout.component.html',
  styleUrl: './narrow-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangNarrowLayoutComponent {
  public appMobileWidth: number = CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH;
}
