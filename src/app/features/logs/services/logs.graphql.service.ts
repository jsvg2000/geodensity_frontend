import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogsGraphqlService {
  constructor(private apollo: Apollo) {}

  getLogs(startDate: string, endDate: string): Observable<any[]> {
    return this.apollo.query<{ getLogs: any[] }>({
      query: gql`
        query getLogs($startDate: String!, $endDate: String!) {
          getLogs(startDate: $startDate, endDate: $endDate) {
            id
            username
            num_countries_returned
            countries_details
          }
        }
      `,
      variables: { startDate, endDate },
      fetchPolicy: 'network-only'
    }).pipe(map(res => res.data.getLogs));
  }

  updateUsername(id: number, username: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateLogUsername($id: ID!, $username: String!) {
          updateLogUsername(id: $id, username: $username) {
            id
            username
          }
        }
      `,
      variables: { id, username }
    });
  }

  deleteLog(id: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteLog($id: ID!) {
          deleteLog(id: $id)
        }
      `,
      variables: { id }
    });
  }
}
