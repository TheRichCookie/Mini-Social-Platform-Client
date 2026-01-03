/* eslint-disable @typescript-eslint/no-explicit-any */
import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {Router} from '@angular/router';
import {UkCardComponent, UkPaginationComponent} from '@utils/ui-kit/components';

@Component({
  selector: 'hang-users-list',
  imports: [UkCardComponent, UkPaginationComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangUsersListComponent {
  private readonly router = inject(Router);

  @Input()
  public items: any[] = [];

  @Input()
  public bindId = 'id';

  @Input()
  public bindLabel = 'label';

  @Input()
  public page = 1;

  @Input()
  public limit = 20;

  @Input()
  public count = 0;

  @Output()
  public readonly ON_CLICK = new EventEmitter();

  public changePage(page: number): void {
    this.page = page;
  }

  public goToProfile(userId: string): void {
    this.ON_CLICK.emit();
    void this.router.navigate(['profile', userId]);
  }
}
