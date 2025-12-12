import type {UkStoringProperty} from './storing-property.enum';

export interface UkStorage {
  get: (key: UkStoringProperty, defaultValue?: string | null) => string | null;
  set: (key: UkStoringProperty, value: string) => void;
  clear: (key: UkStoringProperty) => void;
}
