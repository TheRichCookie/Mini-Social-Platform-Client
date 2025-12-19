import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CONST_CONFIG} from '@utils/ui-kit/definitions';

import {HangHeaderComponent} from '../header/header.component';
import {HangNavBarComponent} from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'hang-main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    HangNavBarComponent,
    HangHeaderComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangMainLayoutComponent {
  public CONFIG = CONST_CONFIG;
  public appMobileWidth: number = this.CONFIG.COMMON.MAX_MOBILE_WIDTH;
}
