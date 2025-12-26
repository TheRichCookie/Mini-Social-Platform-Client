import type {HangAppState} from './app.state';

export const APP_INITIAL_STATE: HangAppState = {
  layout: {
    showHeader: false,
    showTabs: false,
  },
  general: {
    httpFail: {
      timestamp: undefined!,
      methodName: undefined!,
      error: undefined!,
    },
  },
  header: {
    title: undefined!,
  },
  staticData: {
    contract: undefined!,
    rules: undefined!,
  },
  currentUtcTime: undefined!,
};
