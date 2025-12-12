import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'uk-desktop-form',
  imports: [],
  templateUrl: './desktop-form.component.html',
  styleUrl: './desktop-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkDesktopFormComponent {}
