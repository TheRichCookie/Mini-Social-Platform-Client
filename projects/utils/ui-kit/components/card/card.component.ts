import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UK_TYPE} from '@utils/ui-kit/definitions';

import {UkShapeIconComponent} from '../shape-icon/shape-icon.component';
import {UkTextComponent} from '../text/text.component';

@Component({
  standalone: true,
  selector: 'uk-card',
  imports: [CommonModule, UkShapeIconComponent, UkTextComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkCardComponent {
  @Input()
  public text = 'امیر';

  public readonly UK_TYPE = UK_TYPE;
}
