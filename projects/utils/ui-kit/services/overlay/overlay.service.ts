import type {
  ComponentType,
  ConnectedPosition,
  OverlayRef,
} from '@angular/cdk/overlay';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import type {ComponentRef} from '@angular/core';
import {DestroyRef, inject, Injectable} from '@angular/core';

export interface UkOverlayServiceOutput<T> {
  overlayRef: OverlayRef;
  componentRef: ComponentRef<T>;
}

export interface UkCustomOverlayConfig extends OverlayConfig {
  positionInfo?:
    | HTMLElement
    | MouseEvent
    | 'CENTER_BOTTOM'
    | 'CENTER'
    | 'CUSTOM_POSITION'
    | {left: number; top: number};
  inputs?: Map<string, unknown>;
}

@Injectable({
  providedIn: 'root',
})
export class UkOverlayService {
  private readonly overlay = inject(Overlay);
  private readonly destroyRef = inject(DestroyRef);
  private overlayRef!: OverlayRef;

  constructor() {
    // The component that injected this service was destroyed
    this.destroyRef.onDestroy(() => {
      if (this.overlayRef) {
        this.overlayRef.dispose();
      }
    });
  }

  public open<T>(
    component: ComponentType<T>,
    customOverlayConfig?: UkCustomOverlayConfig,
  ): UkOverlayServiceOutput<T> {
    const BACK_DROP_STATUS = true;
    const BACK_DROP_CLASS: string[] | string = 'dark-glass';

    const CONFIG = new OverlayConfig({
      direction: 'rtl',
      hasBackdrop: BACK_DROP_STATUS,
      backdropClass: BACK_DROP_CLASS,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
        .bottom(),
      // width: '450',
    });

    if (!customOverlayConfig?.hasBackdrop) {
      CONFIG.backdropClass = 'transparent-glass';
    }

    if (customOverlayConfig?.width) {
      CONFIG.width = customOverlayConfig.width;
    }

    if (customOverlayConfig?.positionInfo === 'CENTER') {
      CONFIG.positionStrategy = this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
    }

    if (customOverlayConfig?.positionInfo === 'CENTER_BOTTOM') {
      CONFIG.positionStrategy = this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
        .bottom();
    }

    if (customOverlayConfig?.positionInfo instanceof HTMLElement) {
      const originEl = customOverlayConfig.positionInfo;

      const positions: ConnectedPosition[] = [
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -8,
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ];

      // CONFIG.scrollStrategy = this.overlay.scrollStrategies.close();
      CONFIG.positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(originEl)
        .withFlexibleDimensions(false)
        .withPush(false)
        .withPositions(positions);
    }

    const OVERLAY_REF = this.overlay.create(CONFIG);
    const COMPONENT_PORTAL = new ComponentPortal(component, null);
    const COMPONENT_REF = OVERLAY_REF.attach<T>(COMPONENT_PORTAL);

    customOverlayConfig?.inputs?.forEach((v, k) => {
      COMPONENT_REF.setInput(k, v);
    });

    this.overlayRef = OVERLAY_REF;
    const RES: UkOverlayServiceOutput<T> = {
      overlayRef: OVERLAY_REF,
      componentRef: COMPONENT_REF,
    };

    // ✅ observe overlay element resize
    const resizeObserver = new ResizeObserver(() =>
      OVERLAY_REF.updatePosition(),
    );

    resizeObserver.observe(OVERLAY_REF.overlayElement);

    this.destroyRef.onDestroy(() => {
      resizeObserver.disconnect();
    });

    return RES;
  }
}

// usage:
// const INPUTS = new Map<string, any>([['choices', CHOICES]]);
// const OVERLAY = this.overlayService.open(UkChoiceOverlayComponent, {
//     hasBackdrop: true,
//     inputs: INPUTS,
// });

// OVERLAY.overlayRef
//     .backdropClick()
//     .pipe(take(1))
//     .subscribe(() => {
//         OVERLAY.overlayRef.dispose();
//     });
// OVERLAY.componentRef.instance.close.subscribe(() => {
//     OVERLAY.overlayRef.dispose();
// });
// OVERLAY.componentRef.instance.save.subscribe((_info: string) => {
//     // do something with response;
//     OVERLAY.overlayRef.dispose();
// });
