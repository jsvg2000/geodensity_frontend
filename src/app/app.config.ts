import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { countriesReducer } from './features/countries/store/countries.reducer';
import { CountriesEffects } from './features/countries/store/countries.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { logsReducer } from './features/logs/store/logs.reducer';
import { LogsEffects } from './features/logs/store/logs.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ 
      countries: countriesReducer,
      logs: logsReducer
    }),
    provideEffects([CountriesEffects, LogsEffects]),

    provideStoreDevtools(), provideHttpClient(), provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: 'http://18.216.38.26/graphql',
        }),
        cache: new InMemoryCache(),
      };
    }),]
};
