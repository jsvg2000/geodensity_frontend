import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogEntry } from '../store/log-entry.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-log-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-log-dialog.component.html',
  styleUrl: './edit-log-dialog.component.scss',
})
export class EditLogDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LogEntry
  ) {
    this.form = this.fb.group({
      username: [data.username, [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value.username);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
