import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';

const SLIDE_UP_ANIMATION = animation([
  style({transform: 'translateY(100%)'}),
  animate('200ms ease-in-out', style({transform: 'translateY(0%)'})),
]);

const SLIDE_DOWN_ANIMATION = animation([
  style({transform: 'translateY(0%)'}),
  animate('200ms ease-in-out', style({transform: 'translateY(100%)'})),
]);

export const SLIDE_UP_DOWN_TRIGGER = trigger('slideInOut', [
  transition(':enter', [SLIDE_UP_ANIMATION]),
  transition(':leave', [SLIDE_DOWN_ANIMATION]),
]);
