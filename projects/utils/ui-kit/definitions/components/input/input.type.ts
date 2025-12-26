export enum UkInputType {
  NUMBER = 'NUMBER',
  TEXT = 'TEXT',
}
export type InputType = `${UkInputType}`;

export enum UkInputBorderColor {
  TRANSPARENT = 'TRANSPARENT',
  GRADE_1 = 'GRADE-1',
  GRADE_2 = 'GRADE-2',
  REFERENCE_PRIMARY_MAIN = 'REFERENCE-PRIMARY-MAIN',
  CONTENT_ERROR = 'CONTENT-ERROR',
}
export type InputBorderColor = `${UkInputBorderColor}`;

export enum UkInputNumeric {
  DEFAULT = 'DEFAULT',
  PERSIAN = 'PERSIAN',
}
export type InputNumeric = `${UkInputNumeric}`;

export enum UkInputMode {
  NULL = 'NULL',
  NUMERIC = 'NUMERIC',
  TEXT = 'TEXT',
  TEL = 'TEL',
}
export type InputMode = `${UkInputMode}`;

export enum UkInputTypography {
  SUBTITLE_STRONG = 'SUBTITLE-STRONG',
  SUBTITLE = 'SUBTITLE',
}
export type InputTypography = `${UkInputTypography}`;

export enum UkInputFgColor {
  CONTENT_HIGH_EMPHASIS = 'CONTENT-HIGH-EMPHASIS',
  CONTENT_LOW_EMPHASIS = 'CONTENT-LOW-EMPHASIS',
}
export type InputFgColor = `${UkInputFgColor}`;

export enum UkInputMask {
  SEPARATOR = 'separator',
}
export type InputMask = `${UkInputMask}`;
