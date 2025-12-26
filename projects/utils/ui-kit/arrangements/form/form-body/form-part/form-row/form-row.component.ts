import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-form-row',
  imports: [CommonModule],
  templateUrl: './form-row.component.html',
  styleUrl: './form-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkFormRowComponent {}
