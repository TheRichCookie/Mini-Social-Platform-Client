/* eslint-disable @typescript-eslint/no-explicit-any */
import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {Router} from '@angular/router';
import {UkScrollComponent} from '@utils/ui-kit/arrangements';
import {UkCardComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  selector: 'hang-users-list',
  imports: [UkCardComponent, CommonModule, UkScrollComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangUsersListComponent {
  private readonly router = inject(Router);

  @ViewChild(UkScrollComponent)
  public scrollComponent!: UkScrollComponent;

  @Output()
  public readonly LOAD_MORE = new EventEmitter<number>();

  @Output()
  public readonly NO_OVERFLOW = new EventEmitter();

  @Input()
  public items: any[] = [];

  @Input()
  public bindId = 'id';

  @Input()
  public bindLabel = 'label';

  @Input()
  public isLoading = false;

  @Output()
  public readonly ON_CLICK = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;

  public loadMore(): void {
    this.LOAD_MORE.emit();
  }

  public noOverflow(): void {
    this.NO_OVERFLOW.emit();
  }

  public goToProfile(userId: string): void {
    this.ON_CLICK.emit();
    void this.router.navigate(['profile', userId]);
  }
}
