import {CommonModule} from '@angular/common';
import type {OnDestroy} from '@angular/core';
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
import {UkScrollService} from '@utils/ui-kit/services';

import {SEARCH_ACTIONS, SEARCH_RESET_ACTIONS} from '../_store/search.actions';
import {SELECT_SEARCH_USERS_RES} from '../_store/search.selectors';

interface PageController {
  props: {
    list: UserSearchModel[];
    count: number;
    isLoading: boolean;
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
    loadMore: () => void;
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
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    HangUsersListComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangSearchPageComponent implements OnDestroy {
  private readonly store = inject(Store);
  private readonly scrollService = inject(UkScrollService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public readonly searchResult$ = this.store.select(SELECT_SEARCH_USERS_RES);
  public readonly UK_TYPE = UK_TYPE;

  public PC: PageController = {
    props: {
      list: [],
      count: 0,
      isLoading: false,
      request: {
        query: {
          q: '',
          page: 0,
          limit: 15,
        },
      },
    },
    actions: {
      get: () => {
        const REQUEST = JSON.parse(JSON.stringify(this.PC.props.request));

        REQUEST.query.page += 1;

        this.store.dispatch(SEARCH_ACTIONS.$GET_SEARCH_USERS(REQUEST));
      },
      loadMore: () => {
        if (this.PC.props.isLoading) return;

        let newPageIndex = JSON.parse(
          JSON.stringify(this.PC.props.request.query.page),
        );

        newPageIndex++;

        if (
          this.PC.props.count >
          newPageIndex * this.PC.props.request.query.limit
        ) {
          this.PC.props.isLoading = true;
          this.PC.props.request.query.page = newPageIndex;
          this.changeDetectorRef.markForCheck();
          this.PC.actions.get();
        }
      },
      onSearch: (value) => {
        this.PC.props.request.query = {
          q: value,
          page: 0,
          limit: this.PC.props.request.query.limit,
        };

        this.PC.props.list = [];
        this.PC.props.isLoading = true;

        this.PC.actions.get();
      },
    },
  };

  constructor() {
    this.searchResult$.pipe(takeUntilDestroyed()).subscribe((result) => {
      if (result.totalCount) {
        this.PC.props.count = result.totalCount;
        this.scrollService.ensureScrollableContent();
      }

      this.PC.props.list = [...this.PC.props.list, ...(result.users ?? [])];
      this.PC.props.isLoading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(SEARCH_RESET_ACTIONS.$RESET_SEARCH());
  }
}
