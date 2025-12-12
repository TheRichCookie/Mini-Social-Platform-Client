export enum UkDataBgColor {
  TRANSPARENT = 'TRANSPARENT',
  OPACITY_PRIMARY_00 = 'OPACITY-PRIMARY-00',
  BACKGROUND_SURFACE_00 = 'BACKGROUND-SURFACE-00',
}

export enum UkDataBorderColor {
  TRANSPARENT = 'TRANSPARENT',
  GRADE_1 = 'GRADE-1',
  GRADE_2 = 'GRADE-2',
}

export type DataBorderColor = `${UkDataBorderColor}`;

export type DataBgColor = `${UkDataBgColor}`;
