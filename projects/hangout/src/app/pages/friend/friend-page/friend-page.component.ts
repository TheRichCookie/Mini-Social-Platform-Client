import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import {UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  selector: 'hang-friend-page',
  imports: [
    CommonModule,
    FormsModule,
    UkPagePartComponent,
    UkPageBodyComponent,
    UkPageComponent,
  ],
  templateUrl: './friend-page.component.html',
  styleUrl: './friend-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangFriendPageComponent {
  public readonly UK_TYPE = UK_TYPE;
}
