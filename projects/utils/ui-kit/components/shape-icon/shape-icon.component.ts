import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UkIconComponent} from '@utils/ui-kit/components';
import type {
  IconBorderColor,
  IconFgColor,
  IconName,
  IconSize,
  ShapeIconBGColor,
  ShapeIconSize,
  ShapeIconType,
} from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UK_TYPE,
  UkIconSize,
  UkShapeIconSize,
} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-shape-icon',
  imports: [CommonModule, UkIconComponent],
  templateUrl: './shape-icon.component.html',
  styleUrl: './shape-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkShapeIconComponent {
  private _size: ShapeIconSize = DEFAULT.shapeIcon.size;

  @Input()
  public bgColor: ShapeIconBGColor = DEFAULT.shapeIcon.bgColor;

  @Input()
  public borderColor: IconBorderColor = DEFAULT.shapeIcon.borderColor;

  @Input()
  public fgColor: IconFgColor = DEFAULT.shapeIcon.fgColor;

  @Input()
  public shapeIconType: ShapeIconType = DEFAULT.shapeIcon.type;

  @Input()
  public iconName: IconName = DEFAULT.shapeIcon.iconName;

  public currentIconSize: IconSize = DEFAULT.shapeIcon.iconSize;
  public readonly UK_TYPE = UK_TYPE;

  @Input()
  public set size(shapeIconSize: UkShapeIconSize) {
    this._size = shapeIconSize;

    switch (shapeIconSize) {
      case UkShapeIconSize.LARGE:
        this.currentIconSize = UkIconSize.LARGEST;
        break;
      case UkShapeIconSize.MEDIUM:
        this.currentIconSize = UkIconSize.MEDIUM;
        break;
      case UkShapeIconSize.SMALL:
        this.currentIconSize = UkIconSize.SMALL;
        break;
    }
  }

  public get size(): ShapeIconSize {
    return this._size;
  }
}
