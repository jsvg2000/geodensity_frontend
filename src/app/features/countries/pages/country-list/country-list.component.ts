import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as CountriesActions from '../../store/countries.actions';
import * as CountriesSelectors from '../../store/countries.selectors';
import { Observable } from 'rxjs';
import { Country } from '../../store/countries.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
})
export class CountryListComponent implements OnInit {
  form!: FormGroup;

  countries$!: Observable<Country[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  displayedColumns: string[] = ['name', 'population', 'area', 'density'];
  dataSource = new MatTableDataSource<Country>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      numberOfCountries: [
        10,
        [Validators.required, Validators.min(1), Validators.max(50)],
      ],
    });

    this.countries$ = this.store.select(CountriesSelectors.selectCountries);
    this.loading$ = this.store.select(CountriesSelectors.selectLoading);
    this.error$ = this.store.select(CountriesSelectors.selectError);

    this.countries$.subscribe((countries) => {
      this.dataSource.data = countries ?? [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const username = this.form.value.username;
    const limit = this.form.value.numberOfCountries;

    this.store.dispatch(CountriesActions.setUsername({ username }));
    this.store.dispatch(CountriesActions.setLimit({ limit }));
    this.store.dispatch(CountriesActions.loadCountries({ limit, username }));
  }
}
