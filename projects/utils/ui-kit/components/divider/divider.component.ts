import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import type {
  DividerBgColor,
  DividerDisplay,
  DividerMargin,
  DividerSize,
} from '../../definitions';
import {DEFAULT} from '../../definitions';

@Component({
  standalone: true,
  selector: 'uk-divider',
  imports: [CommonModule],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkDividerComponent {
  @Input()
  public bgColor: DividerBgColor = DEFAULT.divider.bgColor;

  @Input()
  public size: DividerSize = DEFAULT.divider.size;

  @Input()
  public margin: DividerMargin = DEFAULT.divider.margin;

  @Input()
  public display: DividerDisplay = DEFAULT.divider.display;
}
