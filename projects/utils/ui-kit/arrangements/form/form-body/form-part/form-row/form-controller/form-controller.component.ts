import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UkTextComponent} from '@utils/ui-kit/components';

import {UK_TYPE} from '../../../../../../definitions';

@Component({
  standalone: true,
  selector: 'uk-form-controller',
  imports: [CommonModule, UkTextComponent],
  templateUrl: './form-controller.component.html',
  styleUrl: './form-controller.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormControllerComponent {
  @Input()
  public isRequired = false;

  public readonly UK_TYPE = UK_TYPE;
}
