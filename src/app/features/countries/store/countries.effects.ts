import { inject,Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountriesActions from './countries.actions';
import { catchError, map, mergeMap, of, delay } from 'rxjs';
import { Country } from './countries.models';
import { CountriesGraphqlService } from '../services/countries.graphql.service';

@Injectable()
export class CountriesEffects {
    private actions$ = inject(Actions);
    private countriesService = inject(CountriesGraphqlService);
    
    constructor() {}
    loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.loadCountries),
      mergeMap(({ limit, username  }) =>
        this.countriesService.getCountries(limit, username).pipe(
          map(topCountries =>
            CountriesActions.loadCountriesSuccess({ topCountries })
          ),
          catchError(error =>
            of(
              CountriesActions.loadCountriesFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}