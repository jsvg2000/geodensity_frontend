import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogsState } from './logs.state';

export const selectLogsState = createFeatureSelector<LogsState>('logs');

export const selectAllLogs = createSelector(
  selectLogsState,
  (state) => state.logs
);

export const selectLogsLoading = createSelector(
  selectLogsState,
  (state) => state.loading
);

export const selectLogsError = createSelector(
  selectLogsState,
  (state) => state.error
);
