import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {BooleanType, CrudMode} from '@utils/ui-kit/definitions';
import {DEFAULT, UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-desktop-form-part',
  imports: [CommonModule],
  templateUrl: './desktop-form-part.component.html',
  styleUrl: './desktop-form-part.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkDesktopFormPartComponent {
  @Input()
  public hasHeader = true;

  @Input()
  public crudMode: CrudMode = DEFAULT.form.formPart.mode;

  @Input()
  public hasBorder: BooleanType = DEFAULT.desktopFormPart.hasBorder;

  @Input()
  public titleBottomBorder: BooleanType =
    DEFAULT.desktopFormPart.titleBottomBorder;

  @Input()
  public hasPaddings: BooleanType = DEFAULT.desktopFormPart.hasPaddings;

  @Input()
  public bottomPadding: BooleanType = DEFAULT.desktopFormPart.bottomPadding;

  public readonly UK_TYPE = UK_TYPE;
}
