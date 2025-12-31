import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import {UkCardComponent} from '@utils/ui-kit/components';

import {HangProfileDetailsComponent} from './components/details/profile-details.component';

@Component({
  standalone: true,
  selector: 'hang-profile-page',
  imports: [
    CommonModule,
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    HangProfileDetailsComponent,
    UkCardComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfilePageComponent {}
