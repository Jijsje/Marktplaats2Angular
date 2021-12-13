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
    return this.http.post<Gebruiker>(`${this.url}/register`, gebruiker) // post contact to server
      .subscribe(() => this.getGebruikers())  // when posted: getAll (refresh)
  }

  update(c: Gebruiker, id: number): void {
    this.http.put<Gebruiker[]>(`${this.url}/${id}`, c) // put contact to server
      .subscribe(() => this.getGebruikers());  // when posted: getAll (refresh)
  }

  get(id: number): Observable<Gebruiker> {
    return this.http.get<Gebruiker>(`${this.url}/${id}`);
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
