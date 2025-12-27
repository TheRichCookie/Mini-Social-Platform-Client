import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import type {UserSearchModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import {UkFormComponent, UkFormPartComponent} from '@utils/ui-kit/arrangements';
import {
  UkButtonComponent,
  UkImageComponent,
  UkListComponent,
  UkTextComponent,
  UkTileComponent,
} from '@utils/ui-kit/components';

import * as SEARCH_ACTION from '../_store/search.actions';
import {
  SELECT_SEARCH_QUERY,
  SELECT_SEARCH_RESULTS,
} from '../_store/search.selectors';

@Component({
  standalone: true,
  selector: 'hang-search',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UkFormComponent,
    UkFormPartComponent,
    UkListComponent,
    UkTileComponent,
    UkImageComponent,
    UkTextComponent,
    UkButtonComponent,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangSearchComponent {
  private readonly store = inject(Store);

  public readonly results$ = this.store.select(SELECT_SEARCH_RESULTS);

  public readonly query$ = this.store.select(SELECT_SEARCH_QUERY);

  public queryControl = new FormControl<string>('');

  public trackByUser(
    _: number,
    u: UserSearchModel | undefined,
  ): string | undefined {
    return u?._id;
  }

  public onSearch(): void {
    const q = this.queryControl.getRawValue()?.trim() ?? '';

    this.store.dispatch(
      SEARCH_ACTION.SEARCH_ACTIONS.$GET_SEARCH_USERS_POST({
        query: q,
      }),
    );
  }

  public toggleFollow(userId?: string): void {
    if (!userId) return;

    this.store.dispatch(
      SEARCH_ACTION.SEARCH_ACTIONS.$TOGGLE_FOLLOW_USER({
        userId,
      }),
    );
  }
}
