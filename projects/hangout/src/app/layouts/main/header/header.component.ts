import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {HangLogoutModalComponent} from '@app/pages/auth/_modals/logout-modal/logout-modal.component';
import {UkIconComponent, UkTextComponent} from '@utils/ui-kit/components';
import {CONST_CONFIG, UK_TYPE} from '@utils/ui-kit/definitions';
import {UkOverlayService} from '@utils/ui-kit/services';
import {take} from 'rxjs';

@Component({
  standalone: true,
  selector: 'hang-header',
  imports: [UkTextComponent, UkIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UkOverlayService],
})
export class HangHeaderComponent {
  private readonly overlayService = inject(UkOverlayService);
  private readonly destroyRef = inject(DestroyRef);
  public readonly UK_TYPE = UK_TYPE;

  public openLogoutModal(): void {
    const OVERLAY = this.overlayService.open(HangLogoutModalComponent, {
      hasBackdrop: true,
      positionInfo: 'CENTER_BOTTOM',
      width: CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH,
    });

    OVERLAY.overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => {
        OVERLAY.overlayRef.dispose();
      });

    OVERLAY.componentRef.instance.ON_CLOSE.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      OVERLAY.overlayRef.dispose();
    });

    OVERLAY.componentRef.instance.ON_LOGOUT.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      OVERLAY.overlayRef.dispose();
    });
  }
}
