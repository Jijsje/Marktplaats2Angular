import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Gebruiker} from "../model/gebruiker";
import {Observable, Subject} from "rxjs";
import {serverUrl} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class GebruikerService {
  constructor(private http: HttpClient) {
  }

  private url = serverUrl + '/gebruikers';
  private gebruikerSubject = new Subject<Gebruiker[]>();

  add(gebruiker: Gebruiker) {
    console.log("posting something");
    return this.http.post<Gebruiker>(this.url, gebruiker)
      .subscribe(() => this.getGebruikers())
  }

  getGebruikers(): Observable<Gebruiker[]> {
    this.http.get<Gebruiker[]>(this.url)
      .subscribe(
        gebruikers => {
          this.gebruikerSubject.next(gebruikers);
        });
    return this.gebruikerSubject;
  }
}
