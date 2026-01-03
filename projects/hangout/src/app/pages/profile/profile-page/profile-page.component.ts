import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';

import {HangProfileInfoComponent} from './page-parts/profile-info/profile-info.component';
import {HangProfilePostsComponent} from './page-parts/profile-posts/profile-posts.component';

@Component({
  standalone: true,
  selector: 'hang-profile-page',
  imports: [
    CommonModule,
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    HangProfileInfoComponent,
    HangProfilePostsComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfilePageComponent {}
