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
import {
  PROFILE_FOLLOW_ACTIONS,
  PROFILE_RESET_ACTIONS,
} from '@app/pages/profile/_store/profile.actions';
import {SELECT_PROFILE_FOLLOWERS_RES} from '@app/pages/profile/_store/profile.selectors';
import {HangUsersListComponent} from '@app/shared/utils/ui-kit/components';
import {Store} from '@ngrx/store';
import {
  UkButtonGroupComponent,
  UkModalFrameComponent,
  UkScrollComponent,
} from '@utils/ui-kit/arrangements';
import {UkButtonComponent} from '@utils/ui-kit/components';
import type {UserModel} from '@utils/ui-kit/definitions';
import {UK_TYPE} from '@utils/ui-kit/definitions';

interface PageController {
  props: {
    list: UserModel[];
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
    loadMore: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-followers-modal',
  imports: [
    UkModalFrameComponent,
    UkButtonGroupComponent,
    UkButtonComponent,
    CommonModule,
    HangUsersListComponent,
    UkScrollComponent,
  ],
  templateUrl: './followers-modal.component.html',
  styleUrl: './followers-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangFollowersModalComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input({required: true})
  public userId!: string;

  @Output()
  public readonly ON_CLOSE = new EventEmitter();

  public readonly followers$ = this.store.select(SELECT_PROFILE_FOLLOWERS_RES);

  public readonly UK_TYPE = UK_TYPE;
  public readonly maxHeight = 200;

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
        const REQUEST = JSON.parse(JSON.stringify(this.PC.props.request));

        REQUEST.query.page += 1;

        this.store.dispatch(
          PROFILE_FOLLOW_ACTIONS.$GET_PROFILE_FOLLOWERS(REQUEST),
        );
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
    this.followers$.pipe(takeUntilDestroyed()).subscribe((followers) => {
      if (followers.totalCount) {
        this.PC.props.count = followers.totalCount;
      }

      this.PC.props.list = [...this.PC.props.list, ...(followers.items ?? [])];
      this.PC.props.isLoading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  public onClose(): void {
    this.ON_CLOSE.emit();
  }

  public ngOnInit(): void {
    this.PC.props.request.userId = this.userId;
    this.PC.methods.get();
  }

  public ngOnDestroy(): void {
    this.store.dispatch(PROFILE_RESET_ACTIONS.$RESET_FOLLOW());
  }
}
