import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { BooleanType, FormBgColor } from '@utils/ui-kit/definitions';
import { DEFAULT, UK_TYPE } from '@utils/ui-kit/definitions';

import type { CrudMode } from '../../../../definitions';

@Component({
  standalone: true,
  selector: 'uk-form-part',
  imports: [CommonModule],
  templateUrl: './form-part.component.html',
  styleUrl: './form-part.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormPartComponent {
  @Input()
  public title = '';

  @Input()
  public backgroundColor: FormBgColor = DEFAULT.form.formPart.backgroundColor;

  @Input()
  public crudMode: CrudMode = DEFAULT.form.formPart.mode;

  @Input()
  public isDisabled: BooleanType = DEFAULT.form.formPart.isDisabled;

  public readonly UK_TYPE = UK_TYPE;
}
