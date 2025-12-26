import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-form-header',
  imports: [],
  templateUrl: './form-header.component.html',
  styleUrl: './form-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormHeaderComponent {}
