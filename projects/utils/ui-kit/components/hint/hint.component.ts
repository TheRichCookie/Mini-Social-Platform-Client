import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import type {
  HintType,
  IconFgColor,
  IconName,
  TextFgColor,
} from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UK_TYPE,
  UkHintType,
  UkIconFgColor,
  UkTextFgColor,
} from '@utils/ui-kit/definitions';

import { UkIconComponent, UkTextComponent } from '../index';

@Component({
  standalone: true,
  selector: 'uk-hint',
  imports: [CommonModule, UkTextComponent, UkIconComponent],
  templateUrl: './hint.component.html',
  styleUrl: './hint.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkHintComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private _hintType: HintType = DEFAULT.hint.type;

  @Input()
  public iconName: IconName = DEFAULT.hint.iconName;

  public currentIconFgColor: IconFgColor = DEFAULT.hint.iconFgColor;
  public currentLabelFgColor: TextFgColor = DEFAULT.hint.textFgColor;
  public readonly UK_TYPE = UK_TYPE;

  @Input()
  public set hintType(hintType: UkHintType) {
    this._hintType = hintType;

    switch (hintType) {
      case UkHintType.CAUTION: {
        this.currentLabelFgColor = UkTextFgColor.CONTENT_CAUTION;
        this.currentIconFgColor = UkIconFgColor.CONTENT_CAUTION;
        this.changeDetectorRef.markForCheck();

        return;
      }
      case UkHintType.ERROR: {
        this.currentLabelFgColor = UkTextFgColor.CONTENT_ERROR;
        this.currentIconFgColor = UkIconFgColor.CONTENT_CAUTION;
        this.changeDetectorRef.markForCheck();

        return;
      }
      case UkHintType.GRAY_INFO: {
        this.currentLabelFgColor = UkTextFgColor.CONTENT_HIGH_EMPHASIS;
        this.currentIconFgColor = UkIconFgColor.CONTENT_NATURAL;
        this.changeDetectorRef.markForCheck();

        return;
      }
      case UkHintType.SIMPLE_INFO: {
        this.currentLabelFgColor = UkTextFgColor.CONTENT_DARK;
        this.currentIconFgColor = UkIconFgColor.CONTENT_NATURAL;
        this.changeDetectorRef.markForCheck();

        return;
      }
      case UkHintType.BLUE_INFO: {
        this.currentLabelFgColor = UkTextFgColor.CONTENT_PRIMARY;
        this.currentIconFgColor = UkIconFgColor.CONTENT_PRIMARY;
        this.changeDetectorRef.markForCheck();

        return;
      }
      default: {
        this.currentLabelFgColor = UkTextFgColor.CONTENT_DARK;
        this.currentIconFgColor = UkIconFgColor.CONTENT_NATURAL;
        this.changeDetectorRef.markForCheck();
      }
    }
  }

  public get hintType(): HintType {
    return this._hintType;
  }
}
