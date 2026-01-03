import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HangUsersListComponent} from '@app/shared/utils/ui-kit/components';
import {Store} from '@ngrx/store';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
} from '@utils/ui-kit/arrangements';
import {UK_TYPE, type UserSearchModel} from '@utils/ui-kit/definitions';
import {UkSearchBarComponent} from '@utils/ui-kit/forms';

import {SEARCH_ACTIONS} from '../_store/search.actions';
import {SELECT_SEARCH_USERS_RES} from '../_store/search.selectors';

interface PageController {
  props: {
    list: UserSearchModel[];
    count: number;
    request: {
      query: {
        q?: string;
        page: number;
        limit: number;
      };
    };
  };
  actions: {
    get: () => void;
    changePage: (page: number) => void;
    onSearch: (value: string) => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-search-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UkSearchBarComponent,
    HangUsersListComponent,
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangSearchPageComponent {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public readonly searchResult$ = this.store.select(SELECT_SEARCH_USERS_RES);

  public readonly UK_TYPE = UK_TYPE;

  public PC: PageController = {
    props: {
      list: [],
      count: 0,
      request: {
        query: {
          q: '',
          page: 1,
          limit: 20,
        },
      },
    },
    actions: {
      get: () => {
        const REQUEST = JSON.parse(JSON.stringify(this.PC.props.request));

        this.store.dispatch(SEARCH_ACTIONS.$GET_SEARCH_USERS(REQUEST));
      },
      changePage: (page) => {
        this.PC.props.request.query.page = page;
        this.PC.actions.get();
      },
      onSearch: (value) => {
        this.PC.props.request.query.q = value;
        this.PC.actions.get();
      },
    },
  };

  constructor() {
    this.searchResult$.pipe(takeUntilDestroyed()).subscribe((result) => {
      if (result.total) {
        this.PC.props.count = result.total;
      }

      this.PC.props.list = result.users ?? [];
      this.changeDetectorRef.markForCheck();
    });
  }
}
