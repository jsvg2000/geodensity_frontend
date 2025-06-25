import { createReducer, on } from '@ngrx/store';
import * as CountriesActions from './countries.actions';
import { CountriesState } from './countries.models';

export const initialState: CountriesState = {
  username: '',
  limit: 0,
  topCountries: [],
  loading: false,
  error: null
};

export const countriesReducer = createReducer(
  initialState,
  on(CountriesActions.setUsername, (state, { username }) => ({
    ...state,
    username
  })),
  on(CountriesActions.setLimit, (state, { limit }) => ({
    ...state,
    limit
  })),
  on(CountriesActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CountriesActions.loadCountriesSuccess, (state, { topCountries }) => ({
    ...state,
    loading: false,
    topCountries
  })),
  on(CountriesActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
