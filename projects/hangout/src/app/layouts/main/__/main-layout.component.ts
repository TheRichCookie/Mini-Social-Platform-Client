import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CONST_CONFIG} from '@utils/ui-kit/definitions';

import {HangSidebarComponent} from '../sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'hang-main-layout',
  imports: [CommonModule, RouterOutlet, HangSidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangMainLayoutComponent {
  public appMobileWidth: number = CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH;
}
