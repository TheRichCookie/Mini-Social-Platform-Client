import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import {
  UkButtonGroupComponent,
  UkModalFrameComponent,
} from '@utils/ui-kit/arrangements';
import {UkButtonComponent, UkTextComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkAlertService, UkAuthenticateService} from '@utils/ui-kit/services';

@Component({
  standalone: true,
  selector: 'hang-logout-modal',
  imports: [
    UkModalFrameComponent,
    UkButtonGroupComponent,
    UkButtonComponent,
    CommonModule,
    UkTextComponent,
  ],
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangLogoutModalComponent {
  private readonly alertService = inject(UkAlertService);
  private readonly authenticateService = inject(UkAuthenticateService);

  @Output()
  public readonly ON_CLOSE = new EventEmitter();

  @Output()
  public readonly ON_LOGOUT = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;

  public onClose(): void {
    this.ON_CLOSE.emit();
  }

  public onLogout(): void {
    this.authenticateService.logout();
    this.alertService.success('با موفقیت خارج شدید.');
    this.ON_LOGOUT.emit();
  }
}
