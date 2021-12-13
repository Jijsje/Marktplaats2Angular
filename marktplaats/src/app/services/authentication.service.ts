import {Gebruiker} from "../model/gebruiker";
import {Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private uri = serverUrl + '/gebruikers';
  loggedInUser!: Gebruiker | null;

  loggedIn$ = new Subject<string>();
  loggedOut$ = new Subject();

  message$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  login(gebruiker: Gebruiker): void {
    console.log(gebruiker);
    this.http.post<Gebruiker>(`${this.uri}/login2`, gebruiker, {observe: 'response'} /* = to receive the full httpresponse instead of only the body */)
      .subscribe(
        data => {
          // get the body from the response:
          this.loggedInUser = data.body;

          // @ts-ignore
          this.loggedIn$.next(this.loggedInUser.username);
          // @ts-ignore
          this.message$.next(`Gebruiker ${this.loggedInUser.username} is ingelogd.`);
          localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

          // or get a header from the response:
          const token = data.headers.get('Authorization')?.substr(7);
          localStorage.setItem('token', JSON.stringify(token));
        },
        error => {
          console.log(error);
          this.message$.next(`Inloggen is mislukt.  Reden: ${error.statusText}.`);
        }
      );
  }

  logout(): void {
    this.loggedInUser = null;
    this.loggedOut$.next(null);
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }
}
