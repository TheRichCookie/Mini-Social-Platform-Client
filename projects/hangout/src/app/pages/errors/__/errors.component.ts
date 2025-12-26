import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'bcs-errors',
  imports: [RouterModule],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BcsErrorsComponent {}
