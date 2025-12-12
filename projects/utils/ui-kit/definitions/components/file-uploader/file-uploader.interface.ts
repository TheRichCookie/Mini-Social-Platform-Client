import type {UkFileUploaderStatus} from './file-uploader.type';

export interface UkImageUpload {
  url: string | null;
  file?: File | null;
  status?: UkFileUploaderStatus;
  fromServer?: boolean;
}
