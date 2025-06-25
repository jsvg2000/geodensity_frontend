import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountriesState } from './countries.models';

export const selectCountriesState = createFeatureSelector<CountriesState>('countries');

export const selectUsername = createSelector(
  selectCountriesState,
  (state) => state.username
);

export const selectLimit = createSelector(
  selectCountriesState,
  (state) => state.limit
);

export const selectCountries = createSelector(
  selectCountriesState,
  (state) => state.topCountries
);

export const selectLoading = createSelector(
  selectCountriesState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCountriesState,
  (state) => state.error
);
