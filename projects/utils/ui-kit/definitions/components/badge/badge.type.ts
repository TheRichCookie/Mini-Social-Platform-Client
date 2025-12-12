export enum UkBadgeType {
  NORMAL = 'NORMAL',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
  CAUTION = 'CAUTION',
}
export type BadgeType = `${UkBadgeType}`;

export enum UkBadgeSize {
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}
export type BadgeSize = `${UkBadgeSize}`;

export enum UkBadgeBorderRadius {
  PX_12 = 'PX-12',
  PX_100 = 'PX-100',
}
export type BadgeBorderRadius = `${UkBadgeBorderRadius}`;
