import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UkIconComponent, UkTextComponent} from '@utils/ui-kit/components';
import type {
  BadgeBorderRadius,
  BadgeSize,
  BadgeType,
  BooleanType,
  IconFgColor,
  IconName,
  IconSize,
  TextFgColor,
  TextNumeric,
  TextTypography,
  UkCursor,
} from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UK_TYPE,
  UkBadgeSize,
  UkBadgeType,
} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-badge',
  imports: [CommonModule, UkTextComponent, UkIconComponent],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkBadgeComponent {
  private _badgeType: BadgeType = DEFAULT.badge.badgeType;
  private _size: BadgeSize = DEFAULT.badge.size;

  @Input()
  public isOutline: BooleanType = DEFAULT.badge.isOutline;

  @Input()
  public startIconName: IconName = null!;

  @Input()
  public endIconName: IconName = null!;

  @Input()
  public isNumeric: TextNumeric = DEFAULT.text.numeric;

  @Input()
  public cursor: UkCursor = DEFAULT.badge.cursor;

  @Input()
  public borderRadius: BadgeBorderRadius = DEFAULT.badge.borderRadius;

  public readonly UK_TYPE = UK_TYPE;
  public currentTextFgColor: TextFgColor = null!;
  public currentIconSize: IconSize = null!;
  public currentIconFgColor: IconFgColor = null!;
  public currentTextTypography: TextTypography = null!;

  constructor() {
    this.badgeType = DEFAULT.badge.badgeType;
    this.size = UkBadgeSize.SMALL;
    this.currentIconSize = UK_TYPE.ICON.SIZE.MEDIUM;
  }

  @Input()
  public set badgeType(badgeType: UkBadgeType) {
    this._badgeType = badgeType;

    switch (badgeType) {
      case UkBadgeType.NORMAL: {
        this.currentTextFgColor = UK_TYPE.TEXT.FG_COLOR.CONTENT_LOW_EMPHASIS;
        this.currentIconFgColor = UK_TYPE.ICON.FG_COLOR.CONTENT_LOW_EMPHASIS;
        break;
      }
      case UkBadgeType.PRIMARY: {
        this.currentTextFgColor = UK_TYPE.TEXT.FG_COLOR.CONTENT_PRIMARY;
        this.currentIconFgColor = UK_TYPE.ICON.FG_COLOR.CONTENT_PRIMARY;
        break;
      }
      case UkBadgeType.SECONDARY: {
        this.currentTextFgColor = UK_TYPE.TEXT.FG_COLOR.CONTENT_SECONDARY;
        this.currentIconFgColor = UK_TYPE.ICON.FG_COLOR.CONTENT_SECONDARY;
        break;
      }
      case UkBadgeType.ERROR: {
        this.currentTextFgColor = UK_TYPE.TEXT.FG_COLOR.CONTENT_ERROR;
        this.currentIconFgColor = UK_TYPE.ICON.FG_COLOR.CONTENT_ERROR;
        break;
      }
      case UkBadgeType.SUCCESS: {
        this.currentTextFgColor = UK_TYPE.TEXT.FG_COLOR.CONTENT_SUCCESS;
        this.currentIconFgColor = UK_TYPE.ICON.FG_COLOR.CONTENT_SUCCESS;
        break;
      }
      case UkBadgeType.INFO: {
        this.currentTextFgColor = UK_TYPE.TEXT.FG_COLOR.CONTENT_PROGRESS;
        this.currentIconFgColor = UK_TYPE.ICON.FG_COLOR.CONTENT_PROGRESS;
        break;
      }
      case UkBadgeType.CAUTION: {
        this.currentTextFgColor = UK_TYPE.TEXT.FG_COLOR.CONTENT_CAUTION;
        this.currentIconFgColor = UK_TYPE.ICON.FG_COLOR.CONTENT_CAUTION;
        break;
      }

      default: {
        break;
      }
    }
  }

  public get badgeType(): BadgeType {
    return this._badgeType;
  }

  @Input()
  public set size(badgeSize: UkBadgeSize) {
    this._size = badgeSize;

    switch (badgeSize) {
      case UkBadgeSize.MEDIUM: {
        this.currentTextTypography = UK_TYPE.TEXT.TYPOGRAPHY.BODY_1_STRONG;
        this.currentIconSize = UK_TYPE.ICON.SIZE.MEDIUM;
        break;
      }
      case UkBadgeSize.SMALL: {
        this.currentTextTypography = UK_TYPE.TEXT.TYPOGRAPHY.BODY_2_STRONG;
        this.currentIconSize = UK_TYPE.ICON.SIZE.SMALL;
        break;
      }
      default: {
        break;
      }
    }
  }

  public get size(): BadgeSize {
    return this._size;
  }
}
