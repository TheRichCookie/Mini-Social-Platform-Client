import type {UkMapMarker} from './map-marker.interface';

export interface UkMapMarkerGroup {
  markers: UkMapMarker[];
  isCluster?: boolean;
}
