import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as LogsActions from '../store/logs.actions';
import * as LogsSelectors from '../store/logs.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogEntry } from '../store/log-entry.model';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EditLogDialogComponent } from './edit-log-dialog.component';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule
  ],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss',
})
export class LogListComponent implements OnInit {
  form!: FormGroup;

  logs$: Observable<LogEntry[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  dataSource = new MatTableDataSource<LogEntry>([]);
  displayedColumns: string[] = ['id', 'username', 'num', 'details', 'created_at', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private store: Store, private dialog: MatDialog) {
    this.logs$ = this.store.select(LogsSelectors.selectAllLogs);
    this.loading$ = this.store.select(LogsSelectors.selectLogsLoading);
    this.error$ = this.store.select(LogsSelectors.selectLogsError);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });

    this.logs$.subscribe((logs) => {
      this.dataSource.data = logs ?? [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { startDate, endDate } = this.form.value;

    const start = new Date(startDate).toISOString().split('T')[0];
    const end = new Date(endDate).toISOString().split('T')[0];

    this.store.dispatch(LogsActions.getLogs({ startDate: start, endDate: end }));
  }

  onEditUsername(log: LogEntry) {
    const dialogRef = this.dialog.open(EditLogDialogComponent, {
      width: '400px',
      data: log,
    });

    dialogRef.afterClosed().subscribe((newUsername: string | null) => {
      if (newUsername && newUsername !== log.username) {
        this.store.dispatch(
          LogsActions.updateLogUsername({ id: log.id, username: newUsername })
        );
      }
    });
  }
}