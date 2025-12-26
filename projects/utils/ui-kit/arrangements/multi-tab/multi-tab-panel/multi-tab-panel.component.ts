import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import type {UkIconName} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-multi-tab-panel',
  imports: [CommonModule],
  templateUrl: './multi-tab-panel.component.html',
  styleUrl: './multi-tab-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkMultiTabPanelComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  @Input()
  public header = '';

  @Input()
  public active = false;

  @Input()
  public iconBefore: UkIconName = null!;

  @Input()
  public iconAfter: UkIconName = null!;

  public markForCheck(): void {
    this.changeDetectorRef.markForCheck();
  }
}
