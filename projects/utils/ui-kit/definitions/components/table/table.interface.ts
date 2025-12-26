import type {EnumTranslation} from '@utils/ui-kit/helpers/enum-type-safe/enum-type-safe.helper';

import type {TableDateFilterMode, TableLayoutTypes} from './table.type';
import {UkTableDateFilterMode} from './table.type';

export interface UkTableOptions {
  paginator: boolean;
  responsiveLayout: TableLayoutTypes;
}

export interface UkTableDateFilterValue {
  mode: TableDateFilterMode;
  from?: Date;
  to?: Date;
}

export interface UkTableEpochRange {
  from: number;
  to: number;
}

export enum UkSortOrderType {
  ASCENDING = 'Ascending',
  DESCENDING = 'Descending',
  NONE = 'None',
}

export interface UkSortModel {
  column: string;
  order: UkSortOrderType;
}

export const TableDateFilterModeTranslated: EnumTranslation<
  typeof UkTableDateFilterMode
> = {
  [UkTableDateFilterMode.RANGE]: 'بازه',
  [UkTableDateFilterMode.BEFORE]: 'قبل از',
  [UkTableDateFilterMode.AFTER]: 'بعد از',
  [UkTableDateFilterMode.BEFORE_OR_EQUAL]: 'قبل از یا مساوی',
  [UkTableDateFilterMode.AFTER_OR_EQUAL]: 'بعد از یا مساوی',
  [UkTableDateFilterMode.SINGLE]: 'روز',
};
