export enum UkButtonUkType {
  NONE = 'NONE',
  OUTLINE_BLUE = 'OUTLINE-BLUE',
}
export type ButtonUkType = `${UkButtonUkType}`;

export enum UkButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}
export type ButtonType = `${UkButtonType}`;

export enum UkButtonStyle {
  NONE = 'NONE',
  OUTLINE = 'OUTLINE',
}
export type ButtonStyle = `${UkButtonStyle}`;

export enum UkButtonPadding {
  NORMAL = 'NORMAL',
  SMALL = 'SMALL',
  NONE = 'NONE',
}
export type ButtonPadding = `${UkButtonPadding}`;

export enum UkButtonHeight {
  H_48 = 'H-48',
  H_40 = 'H-40',
  H_36 = 'H-36',
  H_32 = 'H-32',
}
export type ButtonHeight = `${UkButtonHeight}`;

export enum UkButtonBorderRadius {
  R_12 = 'R-12',
  R_08 = 'R-08',
  R_04 = 'R-04',
  R_00 = 'R-00',
}
export type ButtonBorderRadius = `${UkButtonBorderRadius}`;

export enum UkButtonDisplay {
  INLINE = 'INLINE',
  BLOCK = 'BLOCK',
  SQUARE = 'SQUARE',
}
export type ButtonDisplay = `${UkButtonDisplay}`;

export enum UkButtonBorderColor {
  TRANSPARENT = 'TRANSPARENT',
  COLOR_BORDER_GRADE_0 = 'COLOR-BORDER-GRADE-0',
  COLOR_BORDER_GRADE_1 = 'COLOR-BORDER-GRADE-1',
  COLOR_BORDER_GRADE_2 = 'COLOR-BORDER-GRADE-2',
  COLOR_BUTTON_OUTLINE = 'COLOR-BUTTON-OUTLINE',
  COLOR_BUTTON_ERROR_FILL = 'COLOR-BUTTON-ERROR-FILL',
  COLOR_BUTTON_PRIMARY = 'COLOR-BUTTON-PRIMARY',
  COLOR_BUTTON_SECONDARY = 'COLOR-BUTTON-SECONDARY',
  CONTENT_DISABLED = 'CONTENT-DISABLED',
}
export type ButtonBorderColor = `${UkButtonBorderColor}`;

export enum UkButtonBgColor {
  TRANSPARENT = 'TRANSPARENT',
  BUTTON_PRIMARY = 'BUTTON-PRIMARY',
  CONTENT_SECONDARY = 'CONTENT-SECONDARY',
  ERROR_FILL = 'ERROR-FILL',
  BUTTON_SECONDARY = 'BUTTON-SECONDARY',
  BUTTON_DISABLED = 'BUTTON-DISABLED',
  PRIMARY_1 = 'PRIMARY-1',
}
export type ButtonBgColor = `${UkButtonBgColor}`;
