import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import type {
  BooleanType,
  PagePartBackgroundColor,
  PagePartBottomMargin,
  PagePartSidePaddings,
} from '../../../definitions';
import {
  DEFAULT,
  UkBooleanType,
  UkPagePartBottomMargin,
} from '../../../definitions';

@Component({
  standalone: true,
  selector: 'uk-page-part',
  imports: [CommonModule],
  templateUrl: './page-part.component.html',
  styleUrl: './page-part.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkPagePartComponent {
  @Input()
  public bottomMargin: PagePartBottomMargin = DEFAULT.pagePart.bottomMargin;

  @Input()
  public topPadding: UkBooleanType = DEFAULT.pagePart.topPadding;

  @Input()
  public sidePaddings: PagePartSidePaddings = DEFAULT.pagePart.sidePaddings;

  @Input()
  public bottomPadding: UkBooleanType = DEFAULT.pagePart.bottomPadding;

  @Input()
  public backgroundColor: PagePartBackgroundColor =
    DEFAULT.pagePart.backgroundColor;

  @Input()
  public isFirstChildStick: BooleanType = DEFAULT.pagePart.isFirstChildStick;

  @Input()
  public fullHeight = false;

  @HostBinding('class.is-first-child-stick')
  private get noTopMargin(): boolean {
    return this.isFirstChildStick === UkBooleanType.TRUE;
  }

  @HostBinding('class.bottom-margin-auto')
  private get autoBottomMargin(): boolean {
    return this.bottomMargin === UkPagePartBottomMargin.AUTO;
  }

  @HostBinding('class.bottom-margin-no')
  private get noBottomMargin(): boolean {
    return this.bottomMargin === UkPagePartBottomMargin.NO;
  }

  @HostBinding('class.bottom-margin-yes')
  private get yesBottomMargin(): boolean {
    return this.bottomMargin === UkPagePartBottomMargin.YES;
  }

  @HostBinding('class.full-height-true')
  private get bindFullHeight(): boolean {
    return this.fullHeight;
  }
}
