export enum UkTableLayoutTypes {
  STACK = 'stack',
  SCROLL = 'scroll',
}

export type TableLayoutTypes = `${UkTableLayoutTypes}`;

export enum UkTableDateFilterMode {
  AFTER = 'after',
  AFTER_OR_EQUAL = 'afterOrEqual',
  BEFORE = 'before',
  BEFORE_OR_EQUAL = 'beforeOrEqual',
  RANGE = 'range',
  SINGLE = 'single',
}

export type TableDateFilterMode = `${UkTableDateFilterMode}`;
