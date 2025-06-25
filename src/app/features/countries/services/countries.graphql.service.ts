import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../store/countries.models';

@Injectable({ providedIn: 'root' })
export class CountriesGraphqlService {
  constructor(private apollo: Apollo) {}

  getCountries(limit: number,username:String): Observable<Country[]> {
    return this.apollo.query<{ topCountries: Country[] }>({
      query: gql`
        query topCountries($limit: Int!, $username: String) {
            topCountries(limit: $limit, username: $username) {
                name
                population
                area
                density
            }
        }
      `,
      variables: { limit,username },
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => {
        return result.data.topCountries;
      })
    );
  }
}
