import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {SLIDE_DOWN_UP_TRIGGER} from '../../animations/slide-down-up/slide-down-up.animation';
import {UkBasicCardComponent} from '../../arrangements/card/basic-card/basic-card.component';
import type {DropdownInfoState} from '../../definitions';
import {DEFAULT, UK_TYPE, UkDropdownInfoState} from '../../definitions';
import {UkIconComponent} from '../icon/icon.component';

@Component({
  standalone: true,
  selector: 'uk-dropdown-info',
  imports: [UkIconComponent, UkBasicCardComponent],
  templateUrl: './dropdown-info.component.html',
  styleUrl: './dropdown-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SLIDE_DOWN_UP_TRIGGER],
})
export class UkDropdownInfoComponent {
  @Input()
  public state: DropdownInfoState = DEFAULT.dropdownInfo.state;

  @Output()
  public readonly TOGGLE_STATE = new EventEmitter<DropdownInfoState>();

  public readonly UK_TYPE = UK_TYPE;

  public toggleSlide(): void {
    this.state =
      this.state === UkDropdownInfoState.UP
        ? UkDropdownInfoState.DOWN
        : UkDropdownInfoState.UP;
    this.TOGGLE_STATE.emit(this.state);
  }
}
