import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-form-array',
  imports: [CommonModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormArrayComponent {}
