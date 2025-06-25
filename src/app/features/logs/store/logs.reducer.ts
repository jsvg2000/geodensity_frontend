// logs.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as LogsActions from './logs.actions';
import {  initialLogsState } from './logs.state';

export const logsReducer = createReducer(
  initialLogsState,

  on(LogsActions.getLogs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(LogsActions.loadLogsSuccess, (state, { logs }) => ({
    ...state,
    logs,
    loading: false,
  })),

  on(LogsActions.loadLogsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(LogsActions.updateLogUsernameSuccess, (state, { id, username }) => ({
    ...state,
    logs: state.logs.map((log) =>
      log.id === id ? { ...log, username } : log
    ),
  })),

  on(LogsActions.deleteLogSuccess, (state, { id }) => ({
    ...state,
    logs: state.logs.filter((log) => log.id !== id),
  })),

  on(LogsActions.logsActionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
