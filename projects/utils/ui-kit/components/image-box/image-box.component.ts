import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type {
  ImageBoxPicture,
  ImageBoxSize,
  UkCursor,
} from '@utils/ui-kit/definitions';
import { DEFAULT, UK_TYPE } from '@utils/ui-kit/definitions';

import { UkTextComponent } from '../public-api';

@Component({
  standalone: true,
  selector: 'uk-image-box',
  imports: [CommonModule, UkTextComponent],
  templateUrl: './image-box.component.html',
  styleUrl: './image-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkImageBoxComponent {
  @Input()
  public picture: ImageBoxPicture = DEFAULT.imageBox.picture;

  @Input()
  public size: ImageBoxSize = DEFAULT.imageBox.size;

  @Input()
  public cursor: UkCursor = DEFAULT.imageBox.cursor;

  @Input()
  public src = '';

  @Input()
  public title: string = null!;

  @Input()
  public subTitle: string = null!;

  public readonly UK_TYPE = UK_TYPE;
}
