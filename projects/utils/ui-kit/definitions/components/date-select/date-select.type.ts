export enum UkDateSelectInputMode {
  SEPARATE = 'SEPARATE',
  SINGLE = 'SINGLE',
}

export type DateSelectInputMode = `${UkDateSelectInputMode}`;

export enum UkDateSelectEmptyStatus {
  DEFAULT = 'DEFAULT',
  EMPTY = 'EMPTY',
  NOW = 'NOW',
}

export type DateSelectEmptyStatus = `${UkDateSelectEmptyStatus}`;

export enum UkDateSelectSeparator {
  COMMA = 'COMMA',
  SLASH = 'SLASH',
  DASH = 'DASH',
}

export type DateSelectSeparator = `${UkDateSelectSeparator}`;
