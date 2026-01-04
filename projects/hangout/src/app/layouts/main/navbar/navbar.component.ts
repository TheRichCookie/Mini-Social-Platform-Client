import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from '@app/app.routes';
import {SELECT_HAS_NOTIFICATION} from '@app/shared/store/app/app.selector';
import {Store} from '@ngrx/store';
import {UkIconComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkSocketService} from '@utils/ui-kit/services';

@Component({
  standalone: true,
  selector: 'hang-navbar',
  imports: [RouterModule, UkIconComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangNavBarComponent {
  private readonly socketService = inject(UkSocketService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly store = inject(Store);
  private readonly hasNotification$ = this.store.select(
    SELECT_HAS_NOTIFICATION,
  );

  public readonly UK_TYPE = UK_TYPE;
  public readonly APP_ROUTES = APP_ROUTES;

  public isActive = false;
  public newNotification = false;

  constructor() {
    this.socketService.notification$
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (value) {
          this.newNotification = true;
          this.changeDetectorRef.markForCheck();
        }
      });
    this.hasNotification$
      .pipe(takeUntilDestroyed())
      .subscribe((hasNotification) => {
        if (hasNotification.hasUnread !== undefined) {
          this.newNotification = hasNotification.hasUnread;
          this.changeDetectorRef.markForCheck();
        }
      });
  }
}
