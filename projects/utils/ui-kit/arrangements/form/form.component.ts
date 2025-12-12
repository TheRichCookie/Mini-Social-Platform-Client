import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-form',
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormComponent {
  @Input()
  public formSubmitted = false;
}
