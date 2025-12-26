import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-inner-page-wrapper',
  imports: [],
  templateUrl: './inner-page-wrapper.component.html',
  styleUrl: './inner-page-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkInnerPageWrapperComponent {}
