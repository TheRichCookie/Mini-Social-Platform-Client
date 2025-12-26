import { CommonModule } from '@angular/common';
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
} from '@utils/ui-kit/definitions';
import { DEFAULT, UK_TYPE, UkButtonDisplay } from '@utils/ui-kit/definitions';

import { UkTextComponent } from '../public-api';

@Component({
  standalone: true,
  selector: 'uk-button',
  imports: [CommonModule, UkTextComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkButtonComponent {
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

  // label
  @Input()
  public fgColor: TextFgColor = DEFAULT.button.fgColor;

  @Input()
  public typography: TextTypography = DEFAULT.button.typography;

  @Input()
  public horizontalAlignment: TextHorizontalAlignment =
    DEFAULT.button.horizontalAlignment;

  // type
  @Input()
  public ukType: ButtonUkType = DEFAULT.button.ukType;

  @Input()
  public borderRadius: ButtonBorderRadius = DEFAULT.button.borderRadius;

  public readonly UK_TYPE = UK_TYPE;

  @HostBinding('class.is-blocked')
  private get isBlocked(): boolean {
    return this.display === UkButtonDisplay.BLOCK;
  }
}
