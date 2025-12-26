import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-page-footer',
  imports: [],
  templateUrl: './page-footer.component.html',
  styleUrl: './page-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkPageFooterComponent {}
