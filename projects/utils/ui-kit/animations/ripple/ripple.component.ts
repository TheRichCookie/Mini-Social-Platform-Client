import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ standalone: true, selector: '[ukRipple]' })
export class UkRippleDirective {
  private readonly elementRef = inject(ElementRef);
  private initialPosition = '';
  private initialOverflow = '';
  private ripple!: HTMLSpanElement;
  private rippleSize = 0;
  private endSize = 0;

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    this.initialPosition = this.elementRef.nativeElement.style.position;
    this.initialOverflow = this.elementRef.nativeElement.style.overflow;
    this.elementRef.nativeElement.style.position = 'relative';
    this.elementRef.nativeElement.style.overflow = 'hidden';

    this.createChild(event);
    this.animateElement(this.ripple, this.rippleSize, this.endSize);

    setTimeout(() => {
      this.ripple.remove();
      this.elementRef.nativeElement.style.position = this.initialPosition;
      this.elementRef.nativeElement.style.overflow = this.initialOverflow;
    }, 500);
  }

  private createChild(event: MouseEvent): void {
    this.ripple = document.createElement('span');
    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    this.rippleSize = Math.min(rect.width / 8, rect.height / 8);
    this.endSize = this.findRatio(rect.width, rect.height) * 8;

    this.ripple.style.width = `${this.rippleSize}px`;
    this.ripple.style.height = `${this.rippleSize}px`;

    this.ripple.style.width = `${this.rippleSize}px`;
    this.ripple.style.height = `${this.rippleSize}px`;
    this.ripple.style.position = 'absolute';
    this.ripple.style.borderRadius = '50%';
    this.ripple.style.background = 'rgba(255, 255, 255, .7)';
    this.ripple.style.pointerEvents = 'none';
    this.ripple.style.left = `${event.clientX - rect.left - this.rippleSize / 2}px`;
    this.ripple.style.top = `${event.clientY - rect.top - this.rippleSize / 2}px`;

    this.elementRef.nativeElement.appendChild(this.ripple);
  }

  private animateElement(
    childElement: HTMLElement,
    startSize: number,
    endSize: number,
  ): void {
    let opacity = 1;
    const duration = 500; // Total duration in ms
    const interval = 20; // Interval time in ms
    const steps = duration / interval;
    const opacityChange = opacity / steps;
    const scaleChange = endSize / steps; // Scale to 4 (1 + 3)

    const animate = (): void => {
      if (opacity > 0) {
        opacity -= opacityChange;
        startSize += scaleChange;
        childElement.style.opacity = opacity.toString();
        childElement.style.transform = `scale(${startSize})`;
        requestAnimationFrame(animate);
      } else {
        childElement.style.opacity = '0';
        childElement.style.transform = 'scale(4)';
      }
    };

    animate();
  }

  private findRatio(w: number, h: number): number {
    return Math.max(w, h) / Math.min(w, h);
  }
}
