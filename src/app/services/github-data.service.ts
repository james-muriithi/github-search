import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from '../shared/user.model';
import { Repository } from '../shared/repository.model';

@Injectable({
  providedIn: 'root',
})
export class GithubDataService {
  headers = {
    Authorization: environment.apiKey,
  };

  constructor(private http: HttpClient) {}

  getUserDetails(username: String): Observable<User> {
    return this.http
      .get<User>(this.getUserDetailsEndpoint(username), {
        headers: this.headers,
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserRepositories(username: String): Observable<Repository[]> {
    const params = {
      sort: 'created',
      direction: 'desc',
    };

    return this.http
      .get<Repository[]>(this.getUserRepositoriesEndpoint(username), {
        params,
        headers: this.headers,
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  private getUserDetailsEndpoint(username: String) {
    return `${environment.apiUrl}${username}`;
  }

  private getUserRepositoriesEndpoint(username: String) {
    return `${this.getUserDetailsEndpoint(username)}/repos`;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
