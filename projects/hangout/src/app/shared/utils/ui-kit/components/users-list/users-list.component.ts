/* eslint-disable @typescript-eslint/no-explicit-any */
import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {Router} from '@angular/router';
import {UkScrollComponent} from '@utils/ui-kit/arrangements';
import {UkCardComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';

interface Items {
  id: string;
  label: string;
  [key: string]: any;
}
@Component({
  selector: 'hang-users-list',
  imports: [UkCardComponent, CommonModule, UkScrollComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangUsersListComponent {
  private readonly router = inject(Router);

  @Output()
  public readonly LOAD_MORE = new EventEmitter<number>();

  @Input()
  public items: any[] = [];

  @Input()
  public bindId = 'id';

  @Input()
  public bindLabel = 'label';

  @Input()
  public maxHeight?: number;

  @Input()
  public isLoading = false;

  @Input()
  public maxHeight: number = null!;

  @Output()
  public readonly ON_CLICK = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;
  public appearance: 'auto' | 'compact' | 'native' = 'auto';

  @Input()
  public set items(items: any[]) {
    this._items = items.map((item) => {
      return {
        ...item,
        id: item[this.bindId],
        label: item[this.bindLabel],
      };
    });
  }

  public get items(): Items[] | undefined {
    return this._items;
  }

  public onLoadMore(): void {
    this.ON_LOAD_MORE.emit();
  }

  public goToProfile(userId: string): void {
    this.ON_CLICK.emit();
    void this.router.navigate(['profile', userId]);
  }
}
