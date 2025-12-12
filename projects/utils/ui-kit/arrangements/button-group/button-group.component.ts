import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {
  ButtonGroupAlignType,
  ButtonGroupType,
} from '@utils/ui-kit/definitions';
import {DEFAULT} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-button-group',
  imports: [CommonModule],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkButtonGroupComponent {
  @Input()
  public buttonGroupType: ButtonGroupType = DEFAULT.buttonGroup.type;

  @Input()
  public alignType: ButtonGroupAlignType = DEFAULT.buttonGroup.alignType;
}
