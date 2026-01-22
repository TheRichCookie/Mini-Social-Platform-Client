import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import type {
  ButtonBgColor,
  ButtonBorderColor,
  ButtonBorderRadius,
  ButtonDisplay,
  ButtonHeight,
  ButtonPadding,
  ButtonType,
  ButtonUkType,
  Cursor,
  TextFgColor,
  TextHorizontalAlignment,
  TextTypography,
  TextVerticalAlignment,
} from '@utils/ui-kit/definitions';
import {DEFAULT, UK_TYPE, UkButtonDisplay} from '@utils/ui-kit/definitions';

import {UkTextComponent} from '../public-api';

@Component({
  standalone: true,
  selector: 'uk-button',
  imports: [CommonModule, UkTextComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkButtonComponent {
  private _fgColor: TextFgColor = DEFAULT.button.fgColor;

  @Input()
  public bgColor: ButtonBgColor = DEFAULT.button.bgColor;

  @Input()
  public borderColor: ButtonBorderColor = DEFAULT.button.borderColor;

  @Input()
  public display: ButtonDisplay = DEFAULT.button.display;

  @Input()
  public padding: ButtonPadding = DEFAULT.button.padding;

  @Input()
  public buttonType: ButtonType = DEFAULT.button.type;

  @Input()
  public cursor: Cursor = DEFAULT.button.cursor;

  @Input()
  public height: ButtonHeight = DEFAULT.button.height;

  @Input()
  public disabled = false;

  @Input()
  public typography: TextTypography = DEFAULT.button.typography;

  @Input()
  public horizontalAlignment: TextHorizontalAlignment =
    DEFAULT.button.horizontalAlignment;

  @Input()
  public ukType: ButtonUkType = DEFAULT.button.ukType;

  @Input()
  public borderRadius: ButtonBorderRadius = DEFAULT.button.borderRadius;

  public readonly UK_TYPE = UK_TYPE;
  public readonly verticalAlignment: TextVerticalAlignment = 'CENTER';

  @Input()
  public set fgColor(fgColor: TextFgColor) {
    this._fgColor = fgColor;
  }

  public get fgColor(): TextFgColor {
    return this.disabled
      ? UK_TYPE.TEXT.FG_COLOR.CONTENT_DISABLED
      : this._fgColor;
  }

  @HostBinding('class.is-blocked')
  private get isBlocked(): boolean {
    return this.display === UkButtonDisplay.BLOCK;
  }
}
