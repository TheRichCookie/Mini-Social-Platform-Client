import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SLIDE_DOWN_UP_TRIGGER = [
  trigger('slideInOut', [
    state(
      'DOWN',
      style({
        'max-height': '800px',
        opacity: '1',
        visibility: 'visible',
      }),
    ),
    state(
      'UP',
      style({
        'max-height': '0px',
        opacity: '0',
        visibility: 'hidden',
      }),
    ),
    transition('DOWN => UP', [
      group([
        animate(
          '400ms ease-in-out',
          style({
            opacity: '0',
          }),
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-height': '0px',
          }),
        ),
        animate(
          '700ms ease-in-out',
          style({
            visibility: 'hidden',
          }),
        ),
      ]),
    ]),
    transition('UP => DOWN', [
      group([
        animate(
          '1ms ease-in-out',
          style({
            visibility: 'visible',
          }),
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-height': '800px',
          }),
        ),
        animate(
          '800ms ease-in-out',
          style({
            opacity: '1',
          }),
        ),
      ]),
    ]),
  ]),
];
