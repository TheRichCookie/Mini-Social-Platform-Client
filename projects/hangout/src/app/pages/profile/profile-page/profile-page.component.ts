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
  selector: 'hang-profile-page',
  imports: [
    CommonModule,
    FormsModule,
    UkPagePartComponent,
    UkPageBodyComponent,
    UkPageComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfilePageComponent {
  public readonly UK_TYPE = UK_TYPE;
}
