export interface UkConfigApiVersion {
  V1: UkConfigApiVersions;
  V2: UkConfigApiVersions;
  V3: UkConfigApiVersions;
}

export enum UkConfigApiVersions {
  NONE = 'NONE',
  V1 = '1',
  V2 = '2',
  V3 = '3',
}

export type ConfigApiVersions = `${UkConfigApiVersions}`;
