import type {IconName} from '@utils/ui-kit/definitions';

export interface UkMenu {
  name: string;
  icon: IconName;
  slug: string;
  isActive: boolean;
}
