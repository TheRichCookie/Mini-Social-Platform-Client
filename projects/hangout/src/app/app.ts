import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'hang-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangApp {}
