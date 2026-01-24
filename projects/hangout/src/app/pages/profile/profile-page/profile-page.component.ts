import {CommonModule} from '@angular/common';
import type {OnDestroy} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {
  UkPageBodyComponent,
  UkPageComponent,
  UkPagePartComponent,
  UkScrollComponent,
} from '@utils/ui-kit/arrangements';
import {UkEmptyStateComponent, UkTextComponent} from '@utils/ui-kit/components';
import type {PostModel} from '@utils/ui-kit/definitions';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkAlertService} from '@utils/ui-kit/services';

import {
  PROFILE_DETAIL_ACTIONS,
  PROFILE_RESET_ACTIONS,
} from '../_store/profile.actions';
import {
  SELECT_PROFILE_DELETE_POST_RECEIVED_TIME,
  SELECT_PROFILE_DETAIL_RES,
  SELECT_PROFILE_POSTS_RES,
} from '../_store/profile.selectors';
import {HangProfileInfoComponent} from './page-parts/profile-info/profile-info.component';

interface PageController {
  props: {
    list: PostModel[];
    count: number;
    isLoading: boolean;
    request: {
      userId: string;
      query: {
        page: number;
        limit: number;
      };
    };
  };
  methods: {
    get: () => void;
    deletePost: (postId: string | undefined) => void;
    loadMore: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-profile-page',
  imports: [
    CommonModule,
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    HangProfileInfoComponent,
    UkScrollComponent,
    UkTextComponent,
    UkEmptyStateComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfilePageComponent implements OnDestroy {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly alertService = inject(UkAlertService);
  private readonly store = inject(Store);

  public readonly UK_TYPE = UK_TYPE;
  public readonly posts$ = this.store.select(SELECT_PROFILE_POSTS_RES);
  public readonly user$ = this.store.select(SELECT_PROFILE_DETAIL_RES);
  public readonly deletePost$ = this.store.select(
    SELECT_PROFILE_DELETE_POST_RECEIVED_TIME,
  );

  public PC: PageController = {
    props: {
      list: [],
      count: 0,
      isLoading: false,
      request: {
        userId: '',
        query: {
          page: 0,
          limit: 15,
        },
      },
    },
    methods: {
      get: () => {
        const REQUEST: {
          userId: string;
          query: {
            page: number;
            limit: number;
          };
        } = JSON.parse(JSON.stringify(this.PC.props.request));

        REQUEST.query.page += 1;

        this.store.dispatch(PROFILE_DETAIL_ACTIONS.$GET_PROFILE_POSTS(REQUEST));
      },
      deletePost: (postId) => {
        if (postId) {
          this.store.dispatch(
            PROFILE_DETAIL_ACTIONS.$DELETE_PROFILE_POST({postId: postId}),
          );
        }
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
          this.PC.methods.get();
        }
      },
    },
  };

  constructor() {
    this.activatedRoute.paramMap.subscribe(() => {
      this.store.dispatch(PROFILE_RESET_ACTIONS.$RESET_PROFILE());
    });
    this.posts$.pipe(takeUntilDestroyed()).subscribe((posts) => {
      if (posts.totalCount) {
        this.PC.props.count = posts.totalCount;
      }

      this.PC.props.list = [...this.PC.props.list, ...(posts.items ?? [])];
      this.PC.props.isLoading = false;

      this.changeDetectorRef.markForCheck();
    });
    this.deletePost$.pipe(takeUntilDestroyed()).subscribe((receivedTime) => {
      if (receivedTime) {
        this.alertService.success('پست حذف شد');
        this.PC.methods.get();
      }
    });
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      if (user.user?._id) {
        this.PC.props.request.userId = user.user?._id;

        if (this.PC.props.request.userId) {
          this.reset();
          this.PC.methods.get();
        }

        this.changeDetectorRef.markForCheck();
      }
    });
  }

  public reset(): void {
    this.PC.props.list = [];
    this.PC.props.request.query = {
      page: 0,
      limit: this.PC.props.request.query.limit,
    };
  }

  public ngOnDestroy(): void {
    this.store.dispatch(PROFILE_RESET_ACTIONS.$RESET_PROFILE());
  }
}
