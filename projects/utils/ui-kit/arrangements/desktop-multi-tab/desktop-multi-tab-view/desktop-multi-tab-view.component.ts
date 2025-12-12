import type {BooleanInput} from '@angular/cdk/coercion';
import {CommonModule} from '@angular/common';
import type {AfterViewInit, QueryList} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UkIconComponent, UkTextComponent} from '@utils/ui-kit/components';
import {DEFAULT, UK_TYPE} from '@utils/ui-kit/definitions';
import type {DesktopMultiTabHeaderDisplay} from '@utils/ui-kit/definitions/components/desktop-multi-tab/desktop-multi-tab.type';

import {UkPagePartComponent} from '../../public-api';
import {UkDesktopMultiTabPanelComponent} from '../desktop-multi-tab-panel/desktop-multi-tab-panel.component';

@Component({
  standalone: true,
  selector: 'uk-desktop-multi-tab-view',
  imports: [
    CommonModule,
    UkIconComponent,
    UkPagePartComponent,
    UkTextComponent,
  ],
  templateUrl: './desktop-multi-tab-view.component.html',
  styleUrl: './desktop-multi-tab-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkDesktopMultiTabViewComponent implements AfterViewInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @ContentChildren(UkDesktopMultiTabPanelComponent)
  public tabPanels!: QueryList<UkDesktopMultiTabPanelComponent>;

  @Input()
  public headerDisplay: DesktopMultiTabHeaderDisplay =
    DEFAULT.desktopMultiTab.headerDisplay;

  @Input()
  public headerDivider: BooleanInput = DEFAULT.desktopMultiTab.headerDivider;

  @Input()
  public sidePaddings: BooleanInput = DEFAULT.desktopMultiTab.sidePaddings;

  @Output()
  public readonly ON_SELECT = new EventEmitter<number>();

  @Input()
  public selectedIndex = 0;

  public readonly UK_TYPE = UK_TYPE;
  public destroyRef = inject(DestroyRef);

  public ngAfterViewInit(): void {
    const tabPanelsArr = this.tabPanels.toArray();
    let activePanelIndex = tabPanelsArr.findIndex((tab) => tab.active);

    if (activePanelIndex === -1) {
      activePanelIndex = 0;
    }

    this.tabPanels.toArray().forEach((t) => {
      t.HEADER_CHANGED.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
        () => {
          this.changeDetectorRef.markForCheck();
        },
      );
    });

    this.selectTab(tabPanelsArr[activePanelIndex], activePanelIndex);
  }

  public selectTab(tab: UkDesktopMultiTabPanelComponent, index: number): void {
    this.selectedIndex = index;
    this.ON_SELECT.emit(index);
    this.tabPanels.toArray().forEach((t) => {
      t.active = false;
    });
    tab.active = true;
  }
}
