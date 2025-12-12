import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-form-footer',
  imports: [],
  templateUrl: './form-footer.component.html',
  styleUrl: './form-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormFooterComponent {}
