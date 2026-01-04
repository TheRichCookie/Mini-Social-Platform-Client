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
  }

  public read(): void {
    this.newNotification = false;
    this.changeDetectorRef.markForCheck();
  }
}
