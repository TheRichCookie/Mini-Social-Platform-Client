import type {UkImageInfo} from '../common/image-info.interface';

export interface UkUserFullInfo {
  id: string;
  genderId: string;
  phonePrefix: string;
  mobileNumber: string;
  emailAddress: string;
  userName: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  isMobileNumberVerified?: boolean;
  isEmailAddressVerified?: boolean;
  bio?: string;
  avatars: UkImageInfo[];
}
