import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountryListComponent } from './pages/country-list/country-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    ReactiveFormsModule,
    CountryListComponent,
  ]
})
export class CountriesModule { }