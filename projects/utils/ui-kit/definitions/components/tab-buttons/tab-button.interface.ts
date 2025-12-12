import type {IconName} from '@utils/ui-kit/definitions/components/icon/icon.type';

export interface UkTabButton {
  name: string;
  icon: IconName;
  iconFilled: IconName;
  slug: string;
  isActive: boolean;
}
