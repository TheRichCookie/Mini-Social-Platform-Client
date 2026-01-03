import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
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
import {PROFILE_FOLLOW_ACTIONS} from '@app/pages/profile/_store/profile.actions';
import {SELECT_PROFILE_FOLLOWERS_RES} from '@app/pages/profile/_store/profile.selectors';
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
    changePage: (page: number) => void;
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
  ],
  templateUrl: './followers-modal.component.html',
  styleUrl: './followers-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangFollowersModalComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public userId = '';

  @Output()
  public readonly ON_CLOSE = new EventEmitter();

  public readonly followers$ = this.store.select(SELECT_PROFILE_FOLLOWERS_RES);

  public readonly UK_TYPE = UK_TYPE;

  public PC: PageController = {
    props: {
      list: [],
      count: 0,
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
        const REQUEST = this.PC.props.request;

        this.store.dispatch(
          PROFILE_FOLLOW_ACTIONS.$GET_PROFILE_FOLLOWERS(REQUEST),
        );
      },
      changePage: (page) => {
        this.PC.props.request.query.page = page;
        this.PC.actions.get();
      },
    },
  };

  constructor() {
    this.followers$.pipe(takeUntilDestroyed()).subscribe((followers) => {
      if (followers.totalCount) {
        this.PC.props.count = followers.totalCount;
      }

      this.PC.props.list = followers.items ?? [];
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
}
