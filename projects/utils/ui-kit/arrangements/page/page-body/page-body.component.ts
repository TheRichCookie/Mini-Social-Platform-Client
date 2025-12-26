import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-page-body',
  imports: [CommonModule],
  templateUrl: './page-body.component.html',
  styleUrl: './page-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkPageBodyComponent {
  @Input()
  public fullHeight = false;
}
