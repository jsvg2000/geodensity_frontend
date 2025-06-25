import { LogEntry } from "./log-entry.model";

export interface LogsState {
  logs: LogEntry[];
  loading: boolean;
  error: string | null;
}

export const initialLogsState: LogsState = {
  logs: [],
  loading: false,
  error: null,
};
