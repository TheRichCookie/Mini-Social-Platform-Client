import {CommonModule} from '@angular/common';
import type {OnDestroy} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
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
import {UkTextComponent} from '@utils/ui-kit/components';
import type {NotificationModel} from '@utils/ui-kit/definitions';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkAlertService} from '@utils/ui-kit/services';

import {
  NOTIFICATIONS_ACTIONS,
  NOTIFICATIONS_RESET_ACTIONS,
} from '../_store/notifications.actions';
import {
  SELECT_NOTIFICATIONS_MARK_AS_READ_RECEIVED_TIME,
  SELECT_NOTIFICATIONS_RES,
} from '../_store/notifications.selectors';

interface PageController {
  props: {
    list: NotificationModel[];
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
    markAsRead: (notificationId: string) => void;
    loadMore: () => void;
  };
}

@Component({
  standalone: true,
  selector: 'hang-notifications-page',
  imports: [
    CommonModule,
    RouterModule,
    UkPageComponent,
    UkPageBodyComponent,
    UkPagePartComponent,
    UkScrollComponent,
    UkTextComponent,
  ],
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangNotificationsPageComponent implements OnDestroy {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly alertService = inject(UkAlertService);

  @ViewChild(UkScrollComponent)
  public scrollComponent!: UkScrollComponent;

  public readonly UK_TYPE = UK_TYPE;

  public readonly notifications$ = this.store.select(SELECT_NOTIFICATIONS_RES);
  public readonly markAsRead$ = this.store.select(
    SELECT_NOTIFICATIONS_MARK_AS_READ_RECEIVED_TIME,
  );

  public PC: PageController = {
    props: {
      list: [],
      count: 0,
      isLoading: false,
      request: {
        query: {
          page: 1,
          limit: 20,
        },
      },
    },
    actions: {
      get: () => {
        const REQUEST = JSON.parse(JSON.stringify(this.PC.props.request));

        this.store.dispatch(NOTIFICATIONS_ACTIONS.$GET_NOTIFICATIONS(REQUEST));
      },
      markAsRead: (notificationId) => {
        this.store.dispatch(
          NOTIFICATIONS_ACTIONS.$MARK_AS_READ({id: notificationId}),
        );
      },
      loadMore: () => {
        let newPageIndex = JSON.parse(
          JSON.stringify(this.PC.props.request.query.page),
        );

        newPageIndex++;

        if (
          this.PC.props.count >=
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
    this.notifications$.pipe(takeUntilDestroyed()).subscribe((notification) => {
      if (notification.totalCount) {
        this.PC.props.count = notification.totalCount;
        setTimeout(() => {
          this.scrollComponent.checkOverflow();
        });
      }

      this.PC.props.list.push(...(notification.items ?? []));
      this.PC.props.isLoading = false;

      this.changeDetectorRef.markForCheck();
    });
    this.markAsRead$.pipe(takeUntilDestroyed()).subscribe((receivedTime) => {
      if (receivedTime) {
        this.alertService.success('خوانده شد');
        this.reset();
        this.PC.actions.get();
      }
    });
    this.PC.actions.get();
  }

  public ngOnDestroy(): void {
    this.store.dispatch(NOTIFICATIONS_RESET_ACTIONS.$RESET_NOTIFICATIONS());
  }

  public reset(): void {
    this.PC.props.list = [];
    this.PC.props.request.query = {
      page: 0,
      limit: this.PC.props.request.query.limit,
    };
  }
}
