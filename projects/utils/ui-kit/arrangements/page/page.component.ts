import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import type {
  BooleanType,
  PageBackgroundColor,
  UkPageBodyOverFlow,
} from '../../definitions';
import {DEFAULT} from '../../definitions';

@Component({
  standalone: true,
  selector: 'uk-page',
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkPageComponent {
  @Input()
  public headerBackgroundColor: PageBackgroundColor =
    DEFAULT.page.headerBackgroundColor;

  @Input()
  public bodyBackgroundColor: PageBackgroundColor =
    DEFAULT.page.bodyBackgroundColor;

  @Input()
  public footerBackgroundColor: PageBackgroundColor =
    DEFAULT.page.footerBackgroundColor;

  @Input()
  public topMargin: BooleanType = DEFAULT.page.topMargin;

  @Input()
  public bottomMargin: BooleanType = DEFAULT.page.bottomMargin;

  @Input()
  public bodyOverFlow: UkPageBodyOverFlow = DEFAULT.page.bodyOverFlow;

  @Input()
  public showHeaderBorder = true;

  @Input()
  public showFooterBorder = true;
}
