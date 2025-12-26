/* eslint-disable @typescript-eslint/naming-convention */
import { CommonModule } from '@angular/common';
import type {
  AfterViewInit,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { UK_TYPE } from '../../definitions';
import { UkTextComponent } from '../text/text.component';
import type { UkWheelSelectorModel } from './wheel-selector.models';

export type { UkWheelSelectorModel as UkWheelSelector };
declare let Audio: new () => HTMLAudioElement;

interface DraggingInfo {
  isDragging: boolean;
  groupIndex: number;
  startPageY: number;
}

interface RotateStyle {
  transform: string;
  opacity: string;
  transition?: string;
}

@Component({
  standalone: true,
  selector: 'uk-wheel-selector',
  imports: [CommonModule, UkTextComponent],
  templateUrl: './wheel-selector.component.html',
  styleUrls: ['./wheel-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkWheelSelectorComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public data: UkWheelSelectorModel[] = [];

  @Output()
  public readonly ON_CHANGE: EventEmitter<{ gIndex: number; iIndex: number }> =
    new EventEmitter<{ gIndex: number; iIndex: number }>();

  @ViewChildren('pickerGroupLayer')
  public pickerGroupLayer!: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('pickerHandleLayer')
  public pickerHandleLayer!: ElementRef<HTMLElement>;

  public click = new Audio();
  public currentIndexList: number[] = [];
  public lastCurrentIndexList: number[] = [];
  public groupsRectList: DOMRect[] = [];
  public touchOrMouse = {
    isTouchable: 'ontouchstart' in window,
    isMouseDown: false,
  };

  public draggingInfo: DraggingInfo = {
    isDragging: false,
    groupIndex: null!,
    startPageY: null!,
  };

  public itemPerDegree = 23;
  public safeDoTimeoutId: ReturnType<typeof setTimeout> | null = null;
  public readonly UK_TYPE = UK_TYPE;

  public ngOnInit(): void {
    this.click.src = 'assets/sounds/click.wav';
    this.click.load();

    this.currentIndexList = this.getInitialCurrentIndexList();
    this.lastCurrentIndexList = ([] as number[]).concat(this.currentIndexList);
    this.groupsRectList = new Array(this.data.length);
    window.addEventListener('resize', this.safeGetRectsBindEvents.bind(this), {
      passive: true,
    });
  }

  public ngAfterViewInit(): void {
    this.eventsRegister();
    this.getGroupsRectList();
  }

  public ngOnDestroy(): void {
    window.removeEventListener(
      'resize',
      this.safeGetRectsBindEvents.bind(this),
    );
  }

  public setGroupData(gIndex: number, groupData: UkWheelSelectorModel): void {
    if (!this.currentIndexList) {
      this.currentIndexList = this.getInitialCurrentIndexList();
    }

    this.data[gIndex] = groupData;
    const iCI = groupData.currentIndex;
    let movedIndex = 0;

    if (
      typeof iCI === 'number' &&
      iCI >= 0 &&
      groupData.list?.length &&
      iCI <= groupData.list.length - 1
    ) {
      movedIndex = Math.round(iCI);
    }

    this.currentIndexList[gIndex] = movedIndex;
    this.lastCurrentIndexList = ([] as number[]).concat(this.currentIndexList);
    this.changeDetectorRef.markForCheck();
  }

  public getInitialCurrentIndexList(): number[] {
    return this.data.map((item, _index) => {
      const iCI = item.currentIndex;

      if (
        typeof iCI === 'number' &&
        iCI >= 0 &&
        item.list?.length &&
        iCI <= item.list.length - 1
      ) {
        return Math.round(iCI);
      }

      return 0;
    });
  }

  public safeGetRectsBindEvents(): void {
    if (this.safeDoTimeoutId) {
      clearTimeout(this.safeDoTimeoutId);
    }

    this.safeDoTimeoutId = setTimeout(() => {
      this.getGroupsRectList();
    }, 200);
  }

  public getGroupsRectList(): void {
    if (this.pickerGroupLayer) {
      this.pickerGroupLayer.toArray().forEach((item, index) => {
        this.groupsRectList[index] = item.nativeElement.getBoundingClientRect();
      });
    }
  }

  public eventsRegister(): void {
    const handleEventLayer = this.pickerHandleLayer.nativeElement;

    if (handleEventLayer) {
      this.addEventsForElement(handleEventLayer);
    }
  }

  public addEventsForElement(el: HTMLElement): void {
    const _ = this.touchOrMouse.isTouchable;
    const eventHandlerList = [
      { name: _ ? 'touchstart' : 'mousedown', handler: this.handleStart },
      { name: _ ? 'touchmove' : 'mousemove', handler: this.handleMove },
      { name: _ ? 'touchend' : 'mouseup', handler: this.handleEnd },
      { name: _ ? 'touchcancel' : 'mouseleave', handler: this.handleCancel },
    ];

    if (!_) {
      eventHandlerList.push({
        name: 'wheel',
        handler: this.handleWheel,
      });
    }

    eventHandlerList.forEach((item, _index) => {
      el.removeEventListener(item.name, item.handler as EventListener, false);
      el.addEventListener(item.name, item.handler.bind(this) as EventListener, {
        passive: true,
      });
    });
  }

  public triggerMiddleLayerGroupClick(gIndex: number): void {
    const data = this.data;

    if (
      typeof gIndex === 'number' &&
      typeof data[gIndex].onClick === 'function'
    ) {
      data[gIndex].onClick(gIndex, this.currentIndexList[gIndex]);
    }
  }

  public triggerAboveLayerClick(ev: Event, gIndex: number): void {
    const movedIndex = this.currentIndexList[gIndex] + 1;

    this.currentIndexList[gIndex] = movedIndex;
    this.correctionCurrentIndex(ev as MouseEvent | TouchEvent, gIndex);
  }

  public triggerMiddleLayerClick(ev: Event, gIndex: number): void {
    this.triggerMiddleLayerGroupClick(gIndex);
  }

  public triggerBelowLayerClick(ev: Event, gIndex: number): void {
    const movedIndex = this.currentIndexList[gIndex] - 1;

    this.currentIndexList[gIndex] = movedIndex;
    this.correctionCurrentIndex(ev as MouseEvent | TouchEvent, gIndex);
  }

  public getTouchInfo(ev: MouseEvent | TouchEvent): MouseEvent | Touch {
    return this.touchOrMouse.isTouchable
      ? (ev as TouchEvent).changedTouches[0] || (ev as TouchEvent).touches[0]
      : (ev as MouseEvent);
  }

  public getGroupIndexBelongsEvent(ev: Event): number | null {
    const touchInfo = this.getTouchInfo(ev as MouseEvent | TouchEvent);

    for (let i = 0; i < this.groupsRectList.length; i++) {
      const item = this.groupsRectList[i];

      if (item.left < touchInfo.pageX && touchInfo.pageX < item.right) {
        return i;
      }
    }

    return null;
  }

  public handleEventClick(ev: Event): void {
    void this.click.play();
    const gIndex = this.getGroupIndexBelongsEvent(ev);

    switch ((ev.target as HTMLElement).dataset?.['type']) {
      case 'top':
        this.triggerAboveLayerClick(ev, gIndex!);
        break;
      case 'middle':
        this.triggerMiddleLayerClick(ev, gIndex!);
        break;
      case 'bottom':
        this.triggerBelowLayerClick(ev, gIndex!);
        break;
      case undefined:
      default:
    }
  }

  public handleStart(ev: MouseEvent | TouchEvent): void {
    if (ev.cancelable) {
      // ev.preventDefault();
      ev.stopPropagation();
    }

    const touchInfo = this.getTouchInfo(ev);

    this.draggingInfo.startPageY = touchInfo.pageY;

    if (!this.touchOrMouse.isTouchable) {
      this.touchOrMouse.isMouseDown = true;
    }
  }

  public handleMove(ev: MouseEvent | TouchEvent): void {
    // ev.preventDefault();
    ev.stopPropagation();

    if (this.touchOrMouse.isTouchable || this.touchOrMouse.isMouseDown) {
      this.draggingInfo.isDragging = true;
      this.setCurrentIndexOnMove(ev);
      this.changeDetectorRef.markForCheck();
    }
  }

  public handleEnd(ev: MouseEvent | TouchEvent): void {
    // ev.preventDefault();
    ev.stopPropagation();

    if (!this.draggingInfo.isDragging) {
      this.handleEventClick(ev);
    }

    this.draggingInfo.isDragging = false;
    this.touchOrMouse.isMouseDown = false;
    this.correctionAfterDragging(ev);
  }

  public handleCancel(ev: MouseEvent | TouchEvent): void {
    // ev.preventDefault();
    ev.stopPropagation();

    if (this.touchOrMouse.isTouchable || this.touchOrMouse.isMouseDown) {
      this.correctionAfterDragging(ev);
      this.touchOrMouse.isMouseDown = false;
      this.draggingInfo.isDragging = false;
    }
  }

  public handleWheel(ev: WheelEvent): void {
    this.setCurrentIndexOnWheel(ev);
    this.correctionAfterDragging(ev);
    void this.click.play();
  }

  public setCurrentIndexOnWheel(ev: WheelEvent): void {
    const gIndex = this.getGroupIndexBelongsEvent(ev);

    if (
      typeof gIndex === 'number' &&
      (this.data[gIndex].divider || !this.data[gIndex].list)
    ) {
      return;
    }

    const movedIndex = this.currentIndexList[gIndex!] + ev.deltaY / 53;

    this.currentIndexList[gIndex!] = movedIndex;

    this.correctionCurrentIndex(ev, gIndex);
  }

  public setCurrentIndexOnMove(ev: MouseEvent | TouchEvent): void {
    const touchInfo = this.getTouchInfo(ev);

    if (this.draggingInfo.groupIndex === null) {
      (this.draggingInfo.groupIndex as number | null) =
        this.getGroupIndexBelongsEvent(ev);
    }

    const gIndex = this.draggingInfo.groupIndex;

    if (
      typeof gIndex === 'number' &&
      (this.data[gIndex].divider || !this.data[gIndex].list)
    ) {
      return;
    }

    const moveCount = (this.draggingInfo.startPageY - touchInfo.pageY) / 32;
    const movedIndex = this.currentIndexList[gIndex] + moveCount;

    this.currentIndexList[gIndex] = movedIndex;
    this.draggingInfo.startPageY = touchInfo.pageY;
  }

  public correctionAfterDragging(ev: MouseEvent | TouchEvent): void {
    const gIndex = this.draggingInfo.groupIndex;

    this.correctionCurrentIndex(ev, gIndex);
    this.draggingInfo.groupIndex = null!;
    this.draggingInfo.startPageY = null!;
  }

  public correctionCurrentIndex(
    ev: MouseEvent | TouchEvent,
    gIndex: number | null,
  ): void {
    setTimeout(() => {
      if (
        typeof gIndex === 'number' &&
        this.data[gIndex].divider !== true &&
        this.data[gIndex].list!.length > 0
      ) {
        const unsafeGroupIndex = this.currentIndexList[gIndex];
        let movedIndex = unsafeGroupIndex;

        if (unsafeGroupIndex > this.data[gIndex].list!.length - 1) {
          movedIndex = this.data[gIndex].list!.length - 1;
        } else if (unsafeGroupIndex < 0) {
          movedIndex = 0;
        }

        movedIndex = Math.round(movedIndex);
        this.currentIndexList[gIndex] = movedIndex;

        if (movedIndex !== this.lastCurrentIndexList[gIndex]) {
          this.ON_CHANGE.emit({ gIndex, iIndex: movedIndex });
        }

        this.lastCurrentIndexList = ([] as number[]).concat(
          this.currentIndexList,
        );
        this.changeDetectorRef.markForCheck();
      }
    }, 100);
  }

  public isCurrentItem(gIndex: number, iIndex: number): boolean {
    return this.currentIndexList[gIndex] === iIndex;
  }

  public getCurrentIndexList(): number[] {
    return this.currentIndexList;
  }

  public getGroupClass(gIndex: number): string[] {
    const group = this.data[gIndex];
    const defaultWeightClass = `weight-${group.weight ?? 1}`;
    const groupClass = [defaultWeightClass];

    if (group.className) {
      groupClass.push(group.className);
    }

    return groupClass;
  }

  public getItemClass(
    gIndex: number,
    iIndex: number,
    isDivider = false,
  ): string[] {
    const group = this.data[gIndex];
    const itemClass = [];

    if (!isDivider && this.isCurrentItem(gIndex, iIndex)) {
      itemClass.push('smooth-item-selected');
    }

    if (group.textAlign) {
      itemClass.push(`text-${group.textAlign}`);
    }

    return itemClass;
  }

  public getItemStyle(
    gIndex: number,
    iIndex: number,
  ): { transform: string; opacity?: string } {
    const gapCount = this.currentIndexList[gIndex] - iIndex;

    if (Math.abs(gapCount) < 90 / this.itemPerDegree) {
      const rotateStyle: RotateStyle = {
        transform: `rotateX(${
          gapCount * this.itemPerDegree
        }deg) translate3d(0, 0, 5.625em)`,
        opacity: (
          1 -
          Math.abs(gapCount) / (90 / this.itemPerDegree)
        ).toString(),
      };

      if (!this.draggingInfo.isDragging) {
        rotateStyle.transition = 'transform 150ms ease-out';
      }

      return rotateStyle;
    }

    if (gapCount > 0) {
      return { transform: 'rotateX(90deg) translate3d(0, 0, 5.625em)' };
    }

    return { transform: 'rotateX(-90deg) translate3d(0, 0, 5.625em)' };
  }
}
