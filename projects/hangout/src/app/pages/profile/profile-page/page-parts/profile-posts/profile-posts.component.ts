import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PROFILE_DETAIL_ACTIONS} from '@app/pages/profile/_store/profile.actions';
import {
  SELECT_PROFILE_DELETE_POST_RECEIVED_TIME,
  SELECT_PROFILE_DETAIL_RES,
  SELECT_PROFILE_POSTS_RES,
} from '@app/pages/profile/_store/profile.selectors';
import {Store} from '@ngrx/store';
import {UkScrollComponent} from '@utils/ui-kit/arrangements';
import {UkTextComponent} from '@utils/ui-kit/components';
import type {PostModel} from '@utils/ui-kit/definitions';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkAlertService} from '@utils/ui-kit/services';

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
  actions: {
    get: () => void;
    deletePost: (postId: string | undefined) => void;
    loadMore: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-profile-posts',
  imports: [CommonModule, UkScrollComponent, UkTextComponent],
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfilePostsComponent {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly alertService = inject(UkAlertService);

  @ViewChild(UkScrollComponent)
  public scrollComponent!: UkScrollComponent;

  public readonly UK_TYPE = UK_TYPE;

  public readonly posts$ = this.store.select(SELECT_PROFILE_POSTS_RES);
  public readonly deletePost$ = this.store.select(
    SELECT_PROFILE_DELETE_POST_RECEIVED_TIME,
  );

  public readonly user$ = this.store.select(SELECT_PROFILE_DETAIL_RES);

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
    actions: {
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
          this.PC.actions.get();
        }
      },
    },
  };

  constructor() {
    this.posts$.pipe(takeUntilDestroyed()).subscribe((posts) => {
      if (posts.totalCount) {
        this.PC.props.count = posts.totalCount;
        setTimeout(() => {
          this.scrollComponent.checkOverflow();
        });
      }

      this.PC.props.list.push(...(posts.items ?? []));
      this.PC.props.isLoading = false;

      this.changeDetectorRef.markForCheck();
    });
    this.deletePost$.pipe(takeUntilDestroyed()).subscribe((receivedTime) => {
      if (receivedTime) {
        this.alertService.success('پست حذف شد');
        this.PC.actions.get();
      }
    });
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      if (user.user?._id) {
        this.PC.props.request.userId = user.user?._id;

        if (this.PC.props.request.userId) {
          this.reset();
          this.PC.actions.get();
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
}
