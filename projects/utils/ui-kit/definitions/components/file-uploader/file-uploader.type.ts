export enum UkFileUploaderType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  SHEET = 'SHEET',
}
export type FileUploaderType = `${UkFileUploaderType}`;

export enum UkFileUploaderStatus {
  LOADING = 'LOADING',
  FAILED = 'FAILED',
  DONE = 'DONE',
}
export type FileUploaderStatus = `${UkFileUploaderStatus}`;
