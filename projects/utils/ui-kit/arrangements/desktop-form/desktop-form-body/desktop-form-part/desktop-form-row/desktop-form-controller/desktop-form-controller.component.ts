import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-desktop-form-controller',
  imports: [CommonModule],
  templateUrl: './desktop-form-controller.component.html',
  styleUrl: './desktop-form-controller.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkDesktopFormControllerComponent {
  @Input()
  public isRequired = false;

  public readonly UK_TYPE = UK_TYPE;
}
