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
  ViewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  PROFILE_FOLLOW_ACTIONS,
  PROFILE_RESET_ACTIONS,
} from '@app/pages/profile/_store/profile.actions';
import {SELECT_PROFILE_FOLLOWING_RES} from '@app/pages/profile/_store/profile.selectors';
import {HangUsersListComponent} from '@app/shared/utils/ui-kit/components';
import {Store} from '@ngrx/store';
import {
  UkButtonGroupComponent,
  UkModalFrameComponent,
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
  actions: {
    get: () => void;
    loadMore: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-following-modal',
  imports: [
    UkModalFrameComponent,
    UkButtonGroupComponent,
    UkButtonComponent,
    CommonModule,
    HangUsersListComponent,
  ],
  templateUrl: './following-modal.component.html',
  styleUrl: './following-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangFollowingModalComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild(HangUsersListComponent)
  public usersListComponent!: HangUsersListComponent;

  @Input()
  public userId = '';

  @Output()
  public readonly ON_CLOSE = new EventEmitter();

  public readonly following$ = this.store.select(SELECT_PROFILE_FOLLOWING_RES);
  public readonly UK_TYPE = UK_TYPE;

  public PC: PageController = {
    props: {
      list: [],
      count: 0,
      isLoading: false,
      request: {
        userId: '',
        query: {
          page: 1,
          limit: 20,
        },
      },
    },
    actions: {
      get: () => {
        const REQUEST = JSON.parse(JSON.stringify(this.PC.props.request));

        this.store.dispatch(
          PROFILE_FOLLOW_ACTIONS.$GET_PROFILE_FOLLOWING(REQUEST),
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
          this.PC.actions.get();
        }
      },
    },
  };

  constructor() {
    this.following$.pipe(takeUntilDestroyed()).subscribe((following) => {
      if (following.totalCount) {
        this.PC.props.count = following.totalCount;
        setTimeout(() => {
          this.usersListComponent.scrollComponent.checkOverflow();
        });
      }

      this.PC.props.list.push(...(following.items ?? []));

      this.PC.props.isLoading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  public onClose(): void {
    this.ON_CLOSE.emit();
  }

  public ngOnInit(): void {
    this.PC.props.request.userId = this.userId;
    this.PC.actions.get();
  }

  public ngOnDestroy(): void {
    this.store.dispatch(PROFILE_RESET_ACTIONS.$RESET_FOLLOW());
  }
}
