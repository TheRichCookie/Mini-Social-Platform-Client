import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PROFILE_DETAIL_ACTIONS} from '@app/pages/profile/_store/profile.actions';
import {
  SELECT_PROFILE_DELETE_POST_RECEIVED_TIME,
  SELECT_PROFILE_DETAIL_RES,
  SELECT_PROFILE_POSTS_RES,
} from '@app/pages/profile/_store/profile.selectors';
import {Store} from '@ngrx/store';
import {UkPaginationComponent} from '@utils/ui-kit/components';
import type {PostModel} from '@utils/ui-kit/definitions';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkAlertService} from '@utils/ui-kit/services';

interface PageController {
  props: {
    list: PostModel[];
    count: number;
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
    changePage: (page: number) => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-profile-posts',
  imports: [CommonModule, UkPaginationComponent],
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangProfilePostsComponent {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly alertService = inject(UkAlertService);

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
      request: {
        userId: '',
        query: {
          page: 0,
          limit: 1,
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
      changePage: (page) => {
        this.PC.props.request.query.page = page;
        this.PC.actions.get();
      },
    },
  };

  constructor() {
    this.posts$.pipe(takeUntilDestroyed()).subscribe((posts) => {
      this.PC.props.list = posts.items ?? [];

      if (posts.totalCount) {
        this.PC.props.count = posts.totalCount;
      }

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
          this.PC.actions.get();
        }

        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
