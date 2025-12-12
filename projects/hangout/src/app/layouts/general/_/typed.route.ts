import type {Route} from '@angular/router';
import type {UkSeoConfig} from '@utils/ui-kit/services';

export interface HangRouteData {
  headerTitle?: string;
  backAddress?: string;
  dynamicHeaderTitle?: boolean;
  showHeader?: boolean;
  showTabs?: boolean;
  showBack?: boolean;
  seo?: UkSeoConfig;
}

export const DEFAULT_HANG_ROUTE_DATA: HangRouteData = {
  headerTitle: '',
  backAddress: '',
  dynamicHeaderTitle: true,
  showHeader: true,
  showTabs: true,
  showBack: true,
};

interface HangRoute extends Route {
  data?: HangRouteData;
  children?: HangRoute[];
}

export declare type HangRoutes = HangRoute[];
