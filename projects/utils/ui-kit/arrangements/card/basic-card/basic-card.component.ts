import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import type {
  BasicCardBgColor,
  BasicCardBorderColor,
  BasicCardPadding,
  BasicCardRadius,
} from '../../../definitions';
import {DEFAULT, UK_TYPE} from '../../../definitions';

@Component({
  standalone: true,
  selector: 'uk-basic-card',
  imports: [CommonModule],
  templateUrl: './basic-card.component.html',
  styleUrl: './basic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkBasicCardComponent {
  @Input()
  public padding: BasicCardPadding = DEFAULT.basicCard.padding;

  @Input()
  public bgColor: BasicCardBgColor = DEFAULT.basicCard.bgColor;

  @Input()
  public radius: BasicCardRadius = DEFAULT.basicCard.radius;

  @Input()
  public borderColor: BasicCardBorderColor = DEFAULT.basicCard.borderColor;

  public readonly UK_TYPE = UK_TYPE;
}
