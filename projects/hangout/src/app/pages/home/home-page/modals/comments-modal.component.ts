import {CommonModule} from '@angular/common';
import type {OnDestroy, OnInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {
  UkModalFrameComponent,
  UkScrollComponent,
} from '@utils/ui-kit/arrangements';
import {
  UkEmptyStateComponent,
  UkIconComponent,
  UkShapeIconComponent,
  UkTextComponent,
} from '@utils/ui-kit/components';
import type {CommentModel} from '@utils/ui-kit/definitions';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkInputComponent} from '@utils/ui-kit/forms';

import {COMMENT_ACTIONS, FEED_RESET_ACTIONS} from '../../_store/feed.actions';
import {
  SELECT_ADD_COMMENTS_RES,
  SELECT_COMMENTS_RES,
} from '../../_store/feed.selectors';

interface PageController {
  props: {
    list: CommentModel[];
    count: number;
    isLoading: boolean;
    request: {
      postId: string;
      query: {
        page: number;
        limit: number;
      };
    };
  };
  methods: {
    get: () => void;
    addComment: () => void;
    loadMore: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-comments-modal',
  imports: [
    UkModalFrameComponent,
    CommonModule,
    UkScrollComponent,
    UkInputComponent,
    FormsModule,
    UkEmptyStateComponent,
    UkTextComponent,
    UkShapeIconComponent,
    UkIconComponent,
  ],
  templateUrl: './comments-modal.component.html',
  styleUrl: './comments-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangCommentsModalComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input({required: true})
  public postId!: string;

  @Output()
  public readonly ON_CLOSE = new EventEmitter<number>();

  public readonly comments$ = this.store.select(SELECT_COMMENTS_RES);
  public readonly addCommentsResponse$ = this.store.select(
    SELECT_ADD_COMMENTS_RES,
  );

  public readonly UK_TYPE = UK_TYPE;
  public readonly maxHeight = 500;

  public comment = '';
  public counter = 0;

  public PC: PageController = {
    props: {
      list: [],
      count: 0,
      isLoading: false,
      request: {
        postId: '',
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

        this.store.dispatch(COMMENT_ACTIONS.$GET_COMMENTS(REQUEST));
      },
      addComment: () => {
        const REQUEST = {
          postId: this.postId,
          body: {text: this.comment},
        };

        this.store.dispatch(COMMENT_ACTIONS.$ADD_COMMENT(REQUEST));
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
          this.PC.methods.get();
        }
      },
    },
  };

  constructor() {
    this.comments$.pipe(takeUntilDestroyed()).subscribe((comments) => {
      if (comments.totalCount) {
        this.PC.props.count = comments.totalCount;
      }

      this.PC.props.list = [...this.PC.props.list, ...(comments.items ?? [])];
      this.PC.props.isLoading = false;
      this.changeDetectorRef.markForCheck();
    });
    this.addCommentsResponse$.pipe(takeUntilDestroyed()).subscribe((res) => {
      if (res._id) {
        this.comment = '';
        this.PC.props.list = [];
        this.PC.props.request.query.page = 0;
        this.counter += 1;
        this.PC.methods.get();
      }
    });
  }

  public onClose(): void {
    this.ON_CLOSE.emit(this.counter);
  }

  public ngOnInit(): void {
    this.PC.props.request.postId = this.postId;
    this.PC.methods.get();
  }

  public ngOnDestroy(): void {
    this.store.dispatch(FEED_RESET_ACTIONS.$RESET_COMMENTS());
  }
}
