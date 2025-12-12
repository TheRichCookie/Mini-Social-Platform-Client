import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-form-body',
  imports: [],
  templateUrl: './form-body.component.html',
  styleUrl: './form-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormBodyComponent {}
