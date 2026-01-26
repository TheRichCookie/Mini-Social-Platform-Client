import {CommonModule} from '@angular/common';
import type {OnDestroy} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
  UkScrollComponent,
} from '@utils/ui-kit/arrangements';
import {
  UkEmptyStateComponent,
  UkIconComponent,
  UkShapeIconComponent,
  UkTextComponent,
} from '@utils/ui-kit/components';
import type {FeedPostModel} from '@utils/ui-kit/definitions';
import {CONST_CONFIG, UK_TYPE} from '@utils/ui-kit/definitions';
import {UkTextAreaComponent} from '@utils/ui-kit/forms';
import {UkAlertService, UkOverlayService} from '@utils/ui-kit/services';
import {take} from 'rxjs';

import {
  FEED_ACTIONS,
  FEED_RESET_ACTIONS,
  LIKE_ACTIONS,
} from '../_store/feed.actions';
import {SELECT_FEEDS_RES} from '../_store/feed.selectors';
import {HangCommentsModalComponent} from './modals/comments-modal.component';

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
  methods: {
    get: () => void;
    toggleLike: (item: FeedPostModel) => void;
    openCommentModal: (item: FeedPostModel) => void;
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
    UkTextAreaComponent,
    FormsModule,
    ReactiveFormsModule,
    UkEmptyStateComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangHomePageComponent implements OnDestroy {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly overlayService = inject(UkOverlayService);
  private readonly alertService = inject(UkAlertService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly feeds$ = this.store.select(SELECT_FEEDS_RES);
  public readonly CONST_CONFIG = CONST_CONFIG;
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
    methods: {
      get: () => {
        const REQUEST = JSON.parse(JSON.stringify(this.PC.props.request));

        REQUEST.query.page += 1;

        this.store.dispatch(FEED_ACTIONS.$GET_FEEDS(REQUEST));
      },
      toggleLike: (item) => {
        this.PC.props.list = this.PC.props.list.map((i) =>
          i._id === item._id
            ? {
                ...i,
                isLikedByUser: !i.isLikedByUser,
                likeCount: i.isLikedByUser
                  ? i.likeCount! - 1
                  : i.likeCount! + 1,
              }
            : i,
        );

        if (item._id) {
          this.store.dispatch(LIKE_ACTIONS.$TOGGLE_LIKE({postId: item._id}));
        }
      },
      openCommentModal: (item) => {
        const INPUTS = new Map([['postId', item._id]]);

        const OVERLAY = this.overlayService.open(HangCommentsModalComponent, {
          hasBackdrop: true,
          positionInfo: 'CENTER_BOTTOM',
          width: CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH,
          inputs: INPUTS,
        });

        OVERLAY.overlayRef
          .backdropClick()
          .pipe(take(1))
          .subscribe(() => {
            const COUNTER = OVERLAY.componentRef.instance.counter;

            if (COUNTER) {
              this.updateCommentsCount(item, COUNTER);
            }

            OVERLAY.overlayRef.dispose();
          });

        OVERLAY.componentRef.instance.ON_CLOSE.pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe((counter: number) => {
          if (counter) {
            this.updateCommentsCount(item, counter);
          }

          OVERLAY.overlayRef.dispose();
        });
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
          this.PC.methods.get();
        }
      },
    },
  };

  constructor() {
    this.feeds$.pipe(takeUntilDestroyed()).subscribe((feeds) => {
      if (feeds.totalCount) {
        this.PC.props.count = feeds.totalCount;
      }

      this.PC.props.list = [...this.PC.props.list, ...(feeds.items ?? [])];
      this.PC.props.isLoading = false;

      this.changeDetectorRef.markForCheck();
    });
    this.PC.methods.get();
  }

  public updateCommentsCount(item: FeedPostModel, counter: number): void {
    this.PC.props.list = this.PC.props.list.map((i) =>
      i._id === item._id
        ? {
            ...i,
            commentCount: i.commentCount! + counter,
          }
        : i,
    );
    this.changeDetectorRef.markForCheck();
  }

  public reset(): void {
    this.PC.props.list = [];
    this.PC.props.request.query = {
      page: 0,
      limit: this.PC.props.request.query.limit,
    };
  }

  public ngOnDestroy(): void {
    this.store.dispatch(FEED_RESET_ACTIONS.$RESET_FEEDS());
  }
}
