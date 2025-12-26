import type {UkAppTheme} from './app-theme.enum';
import type {UkAppZoom} from './app-zoom.enum';

export interface UkUi {
  appTheme: UkAppTheme;
  appZoom: UkAppZoom;
  baseColor: string;
  accentColor: string;
  warnColor: string;
  bgColor: string;
  fgColor: string;
}
