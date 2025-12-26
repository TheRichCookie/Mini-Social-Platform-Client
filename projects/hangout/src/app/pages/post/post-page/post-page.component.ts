import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import { UK_TYPE } from '@utils/ui-kit/definitions';

@Component({
  selector: 'hang-post-page',
  imports: [
    CommonModule,
    FormsModule,
    UkPagePartComponent,
    UkPageBodyComponent,
    UkPageComponent,
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangPostPageComponent {
  public readonly UK_TYPE = UK_TYPE;
}
