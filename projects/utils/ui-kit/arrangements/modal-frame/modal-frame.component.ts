import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import {SLIDE_DOWN_UP_TRIGGER} from '@utils/ui-kit/animations';
import {
  UkPageBodyComponent,
  UkPageFooterComponent,
  UkPageHeaderComponent,
} from '@utils/ui-kit/arrangements';
import {UkIconComponent, UkTextComponent} from '@utils/ui-kit/components';
import type {
  BooleanType,
  DeviceMode,
  ModalFrameBorderRadius,
  ModalFramePadding,
  PageBackgroundColor,
} from '@utils/ui-kit/definitions';
import {
  CONST_CONFIG,
  DEFAULT,
  UK_TYPE,
  UkDeviceMode,
  UkModalFrameBorderRadius,
} from '@utils/ui-kit/definitions';

import {UkPageComponent} from '../page/page.component';

@Component({
  standalone: true,
  selector: 'uk-modal-frame',
  imports: [
    UkPageBodyComponent,
    UkPageFooterComponent,
    UkPageComponent,
    UkPageHeaderComponent,
    UkIconComponent,
    CommonModule,
    UkTextComponent,
  ],
  templateUrl: './modal-frame.component.html',
  styleUrl: './modal-frame.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SLIDE_DOWN_UP_TRIGGER],
})
export class UkModalFrameComponent {
  private _deviceMode: DeviceMode = DEFAULT.modalFrame.deviceMode;

  @Input()
  public title = '';

  @Input()
  public showHeader: BooleanType = DEFAULT.modalFrame.showHeader;

  @Input()
  public borderRadius: ModalFrameBorderRadius = DEFAULT.modalFrame.borderRadius;

  @Input()
  public hideBottomFrame = DEFAULT.modalFrame.hideBottomFrame;

  @Input()
  public bodyBackgroundColor: PageBackgroundColor =
    DEFAULT.modalFrame.bodyBackgroundColor;

  @Input()
  public showTopClose = false;

  @Input()
  public showHeaderBorder = false;

  @Input()
  public showFooterBorder = false;

  @Input()
  public padding: ModalFramePadding = DEFAULT.modalFrame.padding;

  @Output()
  public readonly ON_CLOSE = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;
  public appWidth: number = CONST_CONFIG.COMMON.MAX_DESKTOP_WIDTH;

  @Input()
  public set deviceMode(v: DeviceMode) {
    this._deviceMode = v;

    if (v === UkDeviceMode.MOBILE) {
      this.appWidth = CONST_CONFIG.COMMON.MAX_MOBILE_WIDTH;
    }

    if (v === UkDeviceMode.DESKTOP) {
      this.appWidth = CONST_CONFIG.COMMON.MAX_DESKTOP_WIDTH_PADDED;
    }
  }

  public get deviceMode(): DeviceMode {
    return this._deviceMode;
  }

  public onClose(): void {
    this.ON_CLOSE.emit();
  }

  @HostBinding('class.uk-modal-frame-border-radius-CENTER')
  private get isCenter(): boolean {
    return this.borderRadius === UkModalFrameBorderRadius.CENTER;
  }

  @HostBinding('class.uk-modal-frame-border-radius-TOP')
  private get isTop(): boolean {
    return this.borderRadius === UkModalFrameBorderRadius.TOP;
  }

  @HostBinding('class.uk-modal-frame-border-radius-BOTTOM')
  private get isBottom(): boolean {
    return this.borderRadius === UkModalFrameBorderRadius.BOTTOM;
  }
}
