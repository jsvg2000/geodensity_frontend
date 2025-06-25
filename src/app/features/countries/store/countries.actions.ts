import { createAction, props } from '@ngrx/store';
import { Country } from './countries.models';

export const setUsername = createAction(
  '[Countries] Set Username',
  props<{ username: string }>()
);

export const setLimit = createAction(
  '[Countries] Set Limit Of Countries',
  props<{ limit: number }>()
);

export const loadCountries = createAction(
  '[Countries] Load Countries',
  props<{ limit: number, username: string  }>()
);

export const loadCountriesSuccess = createAction(
  '[Countries] Load Countries Success',
  props<{ topCountries: Country[] }>()
);

export const loadCountriesFailure = createAction(
  '[Countries] Load Countries Failure',
  props<{ error: string }>()
);
