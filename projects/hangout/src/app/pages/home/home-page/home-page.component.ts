import {CommonModule} from '@angular/common';
import type {OnDestroy} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
  UkScrollComponent,
} from '@utils/ui-kit/arrangements';
import {
  UkIconComponent,
  UkShapeIconComponent,
  UkTextComponent,
} from '@utils/ui-kit/components';
import type {FeedPostModel} from '@utils/ui-kit/definitions';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkAlertService, UkScrollService} from '@utils/ui-kit/services';

import {FEED_ACTIONS, FEED_REST_ACTIONS} from '../_store/feed.actions';
import {SELECT_FEEDS_RES} from '../_store/feed.selectors';

interface PageController {
  props: {
    list: FeedPostModel[];
    count: number;
    isLoading: boolean;
    request: {
      query: {
        page: number;
        limit: number;
      };
    };
  };
  actions: {
    get: () => void;
    toggleLike: (item: FeedPostModel) => void;
    loadMore: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-home-page',
  imports: [
    CommonModule,
    RouterModule,
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    UkScrollComponent,
    UkTextComponent,
    UkShapeIconComponent,
    UkIconComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangHomePageComponent implements OnDestroy {
  private readonly store = inject(Store);
  private readonly scrollService = inject(UkScrollService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly alertService = inject(UkAlertService);

  private readonly feeds$ = this.store.select(SELECT_FEEDS_RES);
  public readonly UK_TYPE = UK_TYPE;

  public PC: PageController = {
    props: {
      list: [],
      count: 0,
      isLoading: false,
      request: {
        query: {
          page: 0,
          limit: 15,
        },
      },
    },
    actions: {
      get: () => {
        const REQUEST = JSON.parse(JSON.stringify(this.PC.props.request));

        REQUEST.query.page += 1;

        this.store.dispatch(FEED_ACTIONS.$GET_FEEDS(REQUEST));
      },
      toggleLike: (item) => {
        if (item.isLikedByUser !== undefined) {
          item.isLikedByUser = JSON.parse(JSON.stringify(!item.isLikedByUser));
          this.changeDetectorRef.markForCheck();
        }
      },
      loadMore: () => {
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
    },
  };

  constructor() {
    this.feeds$.pipe(takeUntilDestroyed()).subscribe((feed) => {
      if (feed.totalCount) {
        this.PC.props.count = feed.totalCount;
        this.scrollService.ensureScrollableContent();
      }

      this.PC.props.list = [...this.PC.props.list, ...(feed.items ?? [])];
      this.PC.props.isLoading = false;

      this.changeDetectorRef.markForCheck();
    });
    this.PC.actions.get();
  }

  public reset(): void {
    this.PC.props.list = [];
    this.PC.props.request.query = {
      page: 0,
      limit: this.PC.props.request.query.limit,
    };
  }

  public ngOnDestroy(): void {
    this.store.dispatch(FEED_REST_ACTIONS.$RESET_FEEDS());
  }
}
