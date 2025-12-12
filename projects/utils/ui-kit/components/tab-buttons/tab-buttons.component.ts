import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {UkIconComponent, UkTextComponent} from '@utils/ui-kit/components';
import type {BooleanType, UkTabButton} from '@utils/ui-kit/definitions';
import {UK_TYPE, UkBooleanType} from '@utils/ui-kit/definitions';
import {
  UkAppSoundEffectService,
  UkSoundEffects,
  UkSoundEffectsService,
} from '@utils/ui-kit/services';

@Component({
  standalone: true,
  selector: 'uk-tab-buttons',
  imports: [CommonModule, UkIconComponent, UkTextComponent],
  templateUrl: './tab-buttons.component.html',
  styleUrl: './tab-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkTabButtonsComponent {
  private readonly soundEffectsService = inject(UkSoundEffectsService);
  private readonly appSoundEffectService = inject(UkAppSoundEffectService);
  private _currentButton: UkTabButton = null!;

  @Input()
  public buttons: UkTabButton[] = [];

  @Input()
  public enableSound: BooleanType = UkBooleanType.TRUE;

  @Output()
  public readonly ON_CLICK = new EventEmitter<UkTabButton>();

  public readonly UK_TYPE = UK_TYPE;

  @Input()
  public set currentButton(currentButton: UkTabButton) {
    this._currentButton = currentButton;

    this.buttons.forEach((b) => {
      b.isActive = false;
    });

    if (currentButton) {
      const CUR_BTN = this.buttons.find((b) => b.slug === currentButton.slug);

      if (CUR_BTN) {
        CUR_BTN.isActive = true;
      }
    }
  }

  public get currentButton(): UkTabButton {
    return this._currentButton;
  }

  public trackOptionByFn(index: number, _option: UkTabButton): number {
    return index;
  }

  public onClick(button: UkTabButton, _index: number): void {
    if (this.soundStrategy()) {
      this.soundEffectsService.play(UkSoundEffects.CLICK);
    }

    this.ON_CLICK.emit(button);
  }

  public soundStrategy(): boolean {
    if (this.appSoundEffectService.status()) {
      if (this.enableSound === UkBooleanType.TRUE) {
        return true;
      }
    }

    return false;
  }
}
