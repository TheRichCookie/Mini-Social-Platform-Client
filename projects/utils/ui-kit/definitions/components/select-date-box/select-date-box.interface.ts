export enum UkDateRangeTypes {
  LAST_MONTH = 'LastMonth',
  LAST_SEVEN_DAYS = 'LastSevenDays',
  TODAY = 'Today',
  CALENDAR = 'Calendar',
}

export interface UkDateRangeDataModel {
  startDate: number | null;
  toDate?: number | null;
}

export interface UkDateRangeOptionModel {
  id: UkDateRangeTypes;
  text: string;
}
