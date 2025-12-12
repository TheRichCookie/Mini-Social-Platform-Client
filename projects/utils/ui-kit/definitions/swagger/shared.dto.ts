export interface BooleanSingleValue {
  value?: boolean;
}

export interface BooleanSingleValueTime {
  value?: boolean;
  receivedTime?: number;
}

export interface StringSingleValueTime {
  value?: string;
  receivedTime?: number;
}

export interface CommandResponse {
  ok?: boolean;
  resourceId?: number;
}

export interface CommandResponseTimed {
  ok?: boolean;
  resourceId?: number;
  receivedTime?: number;
}

export interface TimeSpan {
  ticks?: number;
  days?: number;
  hours?: number;
  milliseconds?: number;
  minutes?: number;
  seconds?: number;
  totalDays?: number;
  totalHours?: number;
  totalMilliseconds?: number;
  totalMinutes?: number;
  totalSeconds?: number;
}

export interface CityViewModel {
  cityId: string;
  cityName?: string;
  branches: BranchViewModel[];
}

export interface BranchViewModel {
  branchId: string;
  branchName: string;
}

export enum FilterOperator {
  Equal = 1,
  NotEqual = 2,
  Contains = 3,
  StartsWith = 4,
  LessThan = 5,
  GreaterThan = 6,
  LessThanOrEqual = 7,
  GreaterThanOrEqual = 8,
  Between = 9,
}

export enum OrderType {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

export interface CommonErrorResponse {
  receivedTime: number;
  message: string;
}

export interface FilterTable {
  column: string | null;
  operator: FilterOperator;
  minValue?: number | string | null;
  maxValue?: number | string | null;
}

export interface TableRequestViewModel {
  pageNumber: number;
  itemsPerPage: number;
  filters: FilterTable[];
  orders: FilterOrderRequestViewModel[];
}

export interface FilterOrderRequestViewModel {
  column: string;
  order: OrderType;
}