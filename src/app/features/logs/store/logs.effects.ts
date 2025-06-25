import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LogsActions from './logs.actions';
import { LogsGraphqlService } from '../services/logs.graphql.service';
import {
  catchError,
  map,
  mergeMap,
  of,
} from 'rxjs';

@Injectable()
export class LogsEffects {
  private actions$ = inject(Actions);
  private logsService = inject(LogsGraphqlService);

  getLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogsActions.getLogs),
      mergeMap(({ startDate, endDate }) =>
        this.logsService.getLogs(startDate, endDate).pipe(
          map((logs) => LogsActions.loadLogsSuccess({ logs })),
          catchError((error) =>
            of(LogsActions.loadLogsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateLogUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogsActions.updateLogUsername),
      mergeMap(({ id, username }) =>
        this.logsService.updateUsername(id, username).pipe(
          map(() => LogsActions.updateLogUsernameSuccess({ id, username })),
          catchError((error) =>
            of(LogsActions.logsActionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogsActions.deleteLog),
      mergeMap(({ id }) =>
        this.logsService.deleteLog(id).pipe(
          map(() => LogsActions.deleteLogSuccess({ id })),
          catchError((error) =>
            of(LogsActions.logsActionFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
