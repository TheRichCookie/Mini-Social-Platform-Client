import type {BooleanInput} from '@angular/cdk/coercion';
import {CommonModule} from '@angular/common';
import type {AfterContentInit, QueryList} from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {UkTextComponent} from '@utils/ui-kit/components';
import type {MultiTabHeaderDisplay} from '@utils/ui-kit/definitions';
import {DEFAULT, UK_TYPE} from '@utils/ui-kit/definitions';

import {UkPagePartComponent} from '../../../arrangements';
import {UkIconComponent} from '../../../components/icon/icon.component';
import {UkMultiTabPanelComponent} from '../multi-tab-panel/multi-tab-panel.component';

@Component({
  standalone: true,
  selector: 'uk-multi-tab-view',
  imports: [
    CommonModule,
    UkTextComponent,
    UkIconComponent,
    UkPagePartComponent,
  ],
  templateUrl: './multi-tab-view.component.html',
  styleUrl: './multi-tab-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkMultiTabViewComponent implements AfterContentInit {
  @ContentChildren(UkMultiTabPanelComponent)
  public tabPanels!: QueryList<UkMultiTabPanelComponent>;

  @Input()
  public headerDisplay: MultiTabHeaderDisplay = DEFAULT.multiTab.headerDisplay;

  @Input()
  public headerDivider: BooleanInput = DEFAULT.multiTab.headerDivider;

  @Input()
  public sidePaddings: BooleanInput = DEFAULT.multiTab.sidePaddings;

  @Output()
  public readonly ON_SELECT = new EventEmitter<number>();

  public selectedIndex = 0;

  public readonly UK_TYPE = UK_TYPE;

  public ngAfterContentInit(): void {
    const tabPanelsArr = this.tabPanels.toArray();
    let activePanelIndex = tabPanelsArr.findIndex((tab) => tab.active);

    if (activePanelIndex === -1) {
      activePanelIndex = 0;
    }

    this.selectTab(tabPanelsArr[activePanelIndex], activePanelIndex);
  }

  public selectTab(tab: UkMultiTabPanelComponent, index: number): void {
    this.selectedIndex = index;
    this.ON_SELECT.emit(index);
    this.tabPanels.toArray().forEach((t) => {
      t.active = false;
    });
    tab.active = true;
    this.tabPanels.toArray().forEach((t) => {
      t.markForCheck();
    });
  }
}
