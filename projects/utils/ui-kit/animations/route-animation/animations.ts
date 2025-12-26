import {
  animate,
  animateChild,
  group,
  query,
  sequence,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import {UkRouteAnimationType} from './route-animation-types';

const transitionTime = '600ms ';
const transitionTimeForSpecial = '450ms ';
const transitionEaseForSpecial = 'cubic-bezier(0,.44,0,1)';
const transitionEaseForSpecial2 = 'cubic-bezier(.69,0,.66,1.06)';
const transitionEase = 'cubic-bezier(.67,.01,.36,.99)';
const transitionEase2 = 'cubic-bezier(.76,0,.41,.99)';
// const transitionEaseZoom = 'cubic-bezier(.86,.01,.85,.59)';

const scaleMin = 0.7;
const scaleMax = 2;

export const basePageAnimations = trigger('basePageAnimation', [
  state(
    UkRouteAnimationType.DOWN,
    style({
      width: '100%',
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 1,
    }),
  ),
  state(
    UkRouteAnimationType.UP,
    style({
      width: '100%',
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 1,
    }),
  ),
  state(
    UkRouteAnimationType.ZOOM_IN,
    style({
      width: '100%',
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 1,
    }),
  ),
  state(
    UkRouteAnimationType.ZOOM_OUT,
    style({
      width: '100%',
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 1,
    }),
  ),
  state(
    UkRouteAnimationType.LEFT,
    style({
      width: '100%',
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 1,
    }),
  ),
  state(
    UkRouteAnimationType.RIGHT,
    style({
      width: '100%',
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 1,
    }),
  ),
  state(UkRouteAnimationType.FADE, style({width: '100%', left: 0, opacity: 1})),

  // ^^^^^^
  transition('up => void', [
    // ^^ leave ^^
    style({
      opacity: 1,
      top: 0,
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 1,
          top: '-100vh',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),
  transition('void => up', [
    // ^^ enter ^
    style({
      opacity: 1,
      top: '100vh',
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 1,
          top: '0',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),

  // vvvvvvvv
  transition('down => void', [
    // vv leave vv
    style({
      opacity: 1,
      top: '0px',
    }),
    group([
      animate(
        transitionTime + transitionEase2,
        style({
          opacity: 1,
          top: '100vh',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),
  transition('void => down', [
    // vv enter vv
    style({
      opacity: 1,
      top: '-100vh',
    }),
    group([
      animate(
        transitionTime + transitionEase2,
        style({
          opacity: 1,
          top: '0px',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),

  // <<<<<<<<<<
  transition('void => left', [
    // << enter <<
    style({
      opacity: 1,
      transform: 'translateX(100%)',
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 1,
          transform: 'translateX(0)',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),
  transition('left => void', [
    // << leave <<
    style({
      opacity: 1,
      transform: 'translateX(0)',
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 1,
          transform: 'translateX(-100%)',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),

  // >>>>>>>>>>
  transition('void => right', [
    // >> enter >>
    style({
      opacity: 1,
      transform: 'translateX(-100%)',
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 1,
          transform: 'translateX(0)',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),
  transition('right => void', [
    // >> leave >>
    style({
      opacity: 1,
      transform: 'translateX(0)',
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 1,
          transform: 'translateX(100%)',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),

  // <<  __  >>
  transition('void => zoom-in', [
    // << zoom-in enter >>
    style({
      opacity: 0,
      transform: `scale(${scaleMin})`,
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),
  transition('zoom-in => void', [
    // << zoom-in leave >>
    style({
      opacity: 1,
      transform: 'scale(1)',
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 0,
          transform: `scale(${scaleMax})`,
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),

  // >>  __  <<
  transition('void => zoom-out', [
    // >> zoom-out enter <<
    style({
      opacity: 0,
      transform: `scale(${scaleMax})`,
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),
  transition('zoom-out => void', [
    // >> zoom-out leave <<
    style({
      opacity: 1,
      transform: 'scale(1)',
    }),
    animate(
      transitionTime + transitionEase,
      style({
        opacity: 0,
        transform: `scale(${scaleMin})`,
      }),
    ),
  ]),

  // ( (  __  ) )
  transition('void => fade', [
    // ( fade enter )
    style({
      opacity: 0,
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 1,
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),
  transition('fade => void', [
    // ( fade leave )
    style({
      opacity: 1,
    }),
    group([
      animate(
        transitionTime + transitionEase,
        style({
          opacity: 0,
        }),
      ),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),

  // rotate clockwise
  transition('void => leftWithScale', [
    // << enter <<
    style({
      opacity: 1,
      transform: 'translateX(100%) scale(1)',
    }),
    sequence([
      animate(
        transitionTimeForSpecial + transitionEase,
        style({
          opacity: 1,
          transform: 'translateX(100%) scale(0.7)',
        }),
      ),
      animate(
        transitionTimeForSpecial + transitionEase,
        style({
          opacity: 1,
          transform: 'translateX(0) scale(0.7)',
        }),
      ),
      group([
        animate(
          transitionTimeForSpecial + transitionEaseForSpecial2,
          style({
            opacity: 1,
            transform: 'translateX(0) scale(1)',
          }),
        ),
        query('@*', animateChild(), {optional: true}),
      ]),
    ]),
  ]),
  transition('leftWithScale => void', [
    // << leave <<
    style({
      opacity: 1,
      transform: 'translateX(0) scale(1)',
    }),
    sequence([
      animate(
        transitionTimeForSpecial + transitionEaseForSpecial,
        style({
          opacity: 1,
          transform: 'translateX(0) scale(0.7)',
        }),
      ),
      group([
        animate(
          transitionTimeForSpecial + transitionEase,
          style({
            opacity: 1,
            transform: 'translateX(-100%) scale(0.7)',
          }),
        ),
        query('@*', animateChild(), {optional: true}),
      ]),
    ]),
  ]),
  transition('void => rightWithScale', [
    // << enter <<
    style({
      opacity: 1,
      transform: 'translateX(-100%) scale(1)',
    }),
    sequence([
      animate(
        transitionTimeForSpecial + transitionEase,
        style({
          opacity: 1,
          transform: 'translateX(-100%) scale(0.7)',
        }),
      ),
      animate(
        transitionTimeForSpecial + transitionEase,
        style({
          opacity: 1,
          transform: 'translateX(0) scale(0.7)',
        }),
      ),
      group([
        animate(
          transitionTimeForSpecial + transitionEaseForSpecial2,
          style({
            opacity: 1,
            transform: 'translateX(0) scale(1)',
          }),
        ),
        query('@*', animateChild(), {optional: true}),
      ]),
    ]),
  ]),
  transition('rightWithScale => void', [
    // << leave <<
    style({
      opacity: 1,
      transform: 'translateX(0) scale(1)',
    }),
    sequence([
      animate(
        transitionTimeForSpecial + transitionEaseForSpecial,
        style({
          opacity: 1,
          transform: 'translateX(0) scale(0.7)',
        }),
      ),
      group([
        animate(
          transitionTimeForSpecial + transitionEase,
          style({
            opacity: 1,
            transform: 'translateX(100%) scale(0.7)',
          }),
        ),
        query('@*', animateChild(), {optional: true}),
      ]),
    ]),
  ]),
]);
