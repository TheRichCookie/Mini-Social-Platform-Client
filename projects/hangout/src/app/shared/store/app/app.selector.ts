import {createSelector} from '@ngrx/store';

import type {HangBaseState} from '../_base/_base.state';
import type {HangAppState} from './app.state';

const APP_STATE = (store: HangBaseState): HangAppState => store.app;

// general
export const SELECT_APP = createSelector(
  APP_STATE,
  (appState: HangAppState) => appState,
);

// layout
export const SELECT_APP_LAYOUT_SHOW_HEADER = createSelector(
  APP_STATE,
  (appState: HangAppState) => appState.layout.showHeader,
);

export const SELECT_APP_LAYOUT_SHOW_TABS = createSelector(
  APP_STATE,
  (appState: HangAppState) => appState.layout.showTabs,
);

export const SELECT_APP_HEADER_TITLE = createSelector(
  APP_STATE,
  (appState: HangAppState) => appState.header.title,
);

//
export const SELECT_APP_CURRENT_UTC_TIME = createSelector(
  APP_STATE,
  (appState: HangAppState) => appState.currentUtcTime,
);

// common
export const SELECT_APP_GENERAL_HTTP_FAILS = createSelector(
  APP_STATE,
  (appState: HangAppState) => appState.general.httpFail,
);

// notification
export const SELECT_HAS_NOTIFICATION = createSelector(
  APP_STATE,
  (appState: HangAppState) => appState.hasUnreadNotification.response,
);
