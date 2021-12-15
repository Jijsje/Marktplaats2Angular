import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Artikel} from "../model/artikel";
import {DienstCategorie} from "../model/dienstCategorie";
import {ProductCategorie} from "../model/productCategorie";

@Injectable({providedIn: 'root'})
export class CategorieService {
  constructor(private http: HttpClient) {
  }

  private url = serverUrl + '/categorieen';
  private dienstSubject = new Subject<DienstCategorie[]>();
  private productSubject = new Subject<ProductCategorie[]>();


  getAllDiensten(): Observable<DienstCategorie[]> {
    this.http.get<DienstCategorie[]>(`${this.url}/dienst`)
      .subscribe(
        diensten => {
          this.dienstSubject.next(diensten);
        });
    return this.dienstSubject;
  }

  getAllProducten(): Observable<ProductCategorie[]> {
    this.http.get<ProductCategorie[]>(`${this.url}/product`)
      .subscribe(
        producten => {
          this.productSubject.next(producten);
        });
    return this.productSubject;
  }
}
