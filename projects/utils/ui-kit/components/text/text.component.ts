import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import type {
  TextBgColor,
  TextBorderRadius,
  TextDisplay,
  TextFgColor,
  TextHorizontalAlignment,
  TextNumeric,
  TextPadding,
  TextTextWrap,
  TextType,
  TextTypography,
  TextVerticalAlignment,
  TextWhiteSpace,
  UkTextDirection,
} from '@utils/ui-kit/definitions';
import { DEFAULT, UkTextDisplay } from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-text',
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkTextComponent {
  @Input()
  public horizontalAlignment: TextHorizontalAlignment =
    DEFAULT.text.horizontalAlignment;

  @Input()
  public verticalAlignment: TextVerticalAlignment =
    DEFAULT.text.verticalAlignment;

  @Input()
  public bgColor: TextBgColor = DEFAULT.text.bgColor;

  @Input()
  public fgColor: TextFgColor = DEFAULT.text.fgColor;

  @Input()
  public typography: TextTypography = DEFAULT.text.typography;

  @Input()
  public textType: TextType = DEFAULT.text.type;

  @Input()
  public display: TextDisplay = DEFAULT.text.display;

  @Input()
  public padding: TextPadding = DEFAULT.text.padding;

  @Input()
  public borderRadius: TextBorderRadius = DEFAULT.text.borderRadius;

  @Input()
  public textWrap: TextTextWrap = DEFAULT.text.textWrap;

  @Input()
  public whiteSpace: TextWhiteSpace = DEFAULT.text.whiteSpace;

  @Input()
  public numeric: TextNumeric = DEFAULT.text.numeric;

  @Input()
  public direction: UkTextDirection = DEFAULT.text.direction;

  @HostBinding('class.is-block')
  private get isBlock(): boolean {
    return this.display === UkTextDisplay.BLOCK;
  }

  @HostBinding('class.is-inline')
  private get isInline(): boolean {
    return this.display === UkTextDisplay.INLINE;
  }

  @HostBinding('class.is-inline-block')
  private get isInlineBlock(): boolean {
    return this.display === UkTextDisplay.INLINE_BLOCK;
  }

  @HostBinding('class.is-flex')
  private get isFlex(): boolean {
    return this.display === UkTextDisplay.FLEX;
  }

  @HostBinding('class.is-inline-flex')
  private get isInlineFlex(): boolean {
    return this.display === UkTextDisplay.INLINE_FLEX;
  }
}
