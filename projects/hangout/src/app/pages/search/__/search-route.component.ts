import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'hang-search-route',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangSearchRouteComponent {
  private readonly store = inject(Store);
}
