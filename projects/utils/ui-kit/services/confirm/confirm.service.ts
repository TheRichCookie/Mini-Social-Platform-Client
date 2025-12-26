import type { OverlayRef } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { inject, Injectable, NgZone } from '@angular/core';
import { fromEvent, take } from 'rxjs';

export interface UkConfirmConfig {
  title: string;
  prompt: string;
  showOk?: true;
  showCancel?: boolean;
  okString?: string;
  cancelString?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UkConfirmService {
  private readonly overlay = inject(Overlay);
  private readonly ngZone = inject(NgZone);

  private overlayRef: OverlayRef | null = null;

  public async confirm(config: UkConfirmConfig): Promise<boolean | undefined> {
    const showOk = config.showOk ?? true;
    const showCancel = config.showCancel ?? true;
    const okString = config.okString ?? 'تایید';
    const cancelString = config.cancelString ?? 'بازگشت';

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'backdrop',
      panelClass: 'confirm-panel',
      // Optionally, set 'disableClose' to true if you want to control backdrop behavior
    });

    const confirmHtml = `
          <div class="confirm-dialog">
            <div class="confirm-header">
                <div class="title">${config.title}</div>
            </div>
            <div class="confirm-body">
                <p>${config.prompt}</p>
            </div>
            <div class="confirm-footer">
                <div class="actions">
                    ${showCancel ? `<button id="cancel-btn">${cancelString}</button>` : ''}
                    ${showOk ? `<button class="active" id="ok-btn">${okString}</button>` : ''}
                </div>
            </div>
        `;

    const element = document.createElement('div');

    element.innerHTML = confirmHtml;
    this.overlayRef.hostElement.classList.add(
      'cdk-overlay-backdrop',
      'dark-glass',
    );
    this.overlayRef.overlayElement.classList.add('confirm-wrapper');
    this.overlayRef.overlayElement.appendChild(element);

    return new Promise<boolean | undefined>((resolve) => {
      // Use NgZone to ensure Angular is aware of changes
      this.ngZone.runOutsideAngular(() => {
        const cancelButton = element.querySelector('#cancel-btn');
        const okButton = element.querySelector('#ok-btn');

        // Close the overlay on backdrop click
        this.overlayRef
          ?.backdropClick()
          .pipe(take(1))
          .subscribe(() => {
            this.overlayRef?.dispose();
            resolve(false);
          });

        //
        fromEvent(this.overlayRef!.hostElement, 'click')
          .pipe(take(1))
          .subscribe(() => {
            this.overlayRef?.dispose();
            resolve(undefined);
          });

        // OK button click handler
        if (okButton) {
          fromEvent(okButton, 'click')
            .pipe(take(1))
            .subscribe(() => {
              this.overlayRef?.dispose();
              resolve(true);
            });
        }

        // Cancel button click handler
        if (cancelButton) {
          fromEvent(cancelButton, 'click')
            .pipe(take(1))
            .subscribe(() => {
              this.overlayRef?.dispose();
              resolve(false);
            });
        }
      });
    });
  }
}

// usage:
// this.confirmService
// .confirm({
//     title: 'title',
//     prompt: 'prompt?',
// })
// .then(result => {
//     if (result === true) {
//         // Ok logic
//     } else if (result === false) {
//         // Cancel logic
//     } else {
//         // Backdrop clicked or modal closed
//     }
// });
