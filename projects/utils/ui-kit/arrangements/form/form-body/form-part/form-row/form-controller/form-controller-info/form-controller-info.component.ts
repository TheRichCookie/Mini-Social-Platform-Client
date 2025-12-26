import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {ValidationErrors} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'uk-form-controller-info',
  imports: [CommonModule],
  templateUrl: './form-controller-info.component.html',
  styleUrl: './form-controller-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormControllerInfoComponent {
  @Input()
  public errors: ValidationErrors | null = null;
}
