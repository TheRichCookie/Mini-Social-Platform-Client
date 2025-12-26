import type { UkPoint } from './point.interface';

export interface UkMapMarker {
  point: UkPoint;
  iconPath?: string;
  iconScale?: number;
}
