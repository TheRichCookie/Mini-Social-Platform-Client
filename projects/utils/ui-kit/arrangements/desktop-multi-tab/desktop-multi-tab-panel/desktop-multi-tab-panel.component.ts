import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import type {UkIconName} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-desktop-multi-tab-panel',
  imports: [CommonModule],
  templateUrl: './desktop-multi-tab-panel.component.html',
  styleUrl: './desktop-multi-tab-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkDesktopMultiTabPanelComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private _tabCount!: string;

  @Input()
  public active = false;

  @Input()
  public iconBefore: UkIconName = null!;

  @Input()
  public iconAfter: UkIconName = null!;

  @Input()
  public header = '';

  @Output()
  public readonly HEADER_CHANGED = new EventEmitter();

  @Input()
  public set panelCount(value: string) {
    this._tabCount = value;
    this.HEADER_CHANGED.emit();
  }

  public get panelCount(): string {
    return this._tabCount;
  }

  public markForCheck(): void {
    this.changeDetectorRef.markForCheck();
  }
}
