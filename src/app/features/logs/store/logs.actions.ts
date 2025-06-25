// logs.actions.ts
import { createAction, props } from '@ngrx/store';
import { LogEntry } from "./log-entry.model";


export const getLogs = createAction(
  '[Logs] Get Logs',
  props<{ startDate: string; endDate: string }>()
);

export const loadLogsSuccess = createAction(
  '[Logs] Load Logs Success',
  props<{ logs: LogEntry[] }>()
);

export const loadLogsFailure = createAction(
  '[Logs] Load Logs Failure',
  props<{ error: string }>()
);

export const updateLogUsername = createAction(
  '[Logs] Update Log Username',
  props<{ id: number; username: string }>()
);

export const updateLogUsernameSuccess = createAction(
  '[Logs] Update Log Username Success',
  props<{ id: number; username: string }>()
);

export const deleteLog = createAction(
  '[Logs] Delete Log',
  props<{ id: number }>()
);

export const deleteLogSuccess = createAction(
  '[Logs] Delete Log Success',
  props<{ id: number }>()
);

export const logsActionFailure = createAction(
  '[Logs] Action Failure',
  props<{ error: string }>()
);
