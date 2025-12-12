import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {ChoiceItemsStatus} from '@utils/ui-kit/definitions';
import {DEFAULT, UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  selector: 'uk-choice-items',
  imports: [CommonModule],
  templateUrl: './choice-items.component.html',
  styleUrl: './choice-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkChoiceItemsComponent {
  @Input()
  public status: ChoiceItemsStatus = DEFAULT.choiceItems.status;

  public readonly UK_TYPE = UK_TYPE;
}
