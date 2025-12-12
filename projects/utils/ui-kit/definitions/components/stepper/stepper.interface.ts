import type {IconName} from '../icon/icon.type';

export interface UkStepperItem {
  route: string;
  disabled: boolean;
  done: boolean;
  styleClass: string;
  title: string;
  icon: IconName;
}

export type UkStepperItems = UkStepperItem[];
