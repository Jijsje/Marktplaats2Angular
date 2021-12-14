import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Artikel} from "../model/artikel";

@Injectable({providedIn: 'root'})
export class ArtikelService {
  constructor(private http: HttpClient) {
  }

  private url = serverUrl + '/artikelen';
  private artikelSubject = new Subject<Artikel[]>();

  add(artikel: Artikel) {
    return this.http.post<Artikel>(`${this.url}`, artikel) // post contact to server
      .subscribe(() => this.getAll())  // when posted: getAll (refresh)
  }

  getAll(): Observable<Artikel[]> {
    this.http.get<Artikel[]>(this.url)
      .subscribe(
        artikels => {
          this.artikelSubject.next(artikels);
        });
    return this.artikelSubject;
  }
}
