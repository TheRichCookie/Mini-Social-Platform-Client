import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {
  IconFgColor,
  IconName,
  IconSize,
  UkCursor,
} from '@utils/ui-kit/definitions';
import {DEFAULT} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-icon',
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkIconComponent {
  @Input()
  public fgColor: IconFgColor = DEFAULT.icon.fgColor;

  @Input()
  public name: IconName = DEFAULT.icon.name;

  @Input()
  public size: IconSize = DEFAULT.icon.size;

  @Input()
  public colors = true;

  @Input()
  public cursor: UkCursor = DEFAULT.icon.cursor;
}
