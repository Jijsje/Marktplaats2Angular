import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../../../environments/environment";
import {Artikel} from "../../model/artikel";
import {Subject} from "rxjs";

@Component({
  selector: 'app-artikelen',
  templateUrl: './artikelen.component.html',
  styleUrls: ['./artikelen.component.css']
})
export class ArtikelenComponent implements OnInit {

  artikelen: Artikel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getArtikelen();
  }

  getArtikelen(): void {
    let artikelSubject$ = new Subject<Artikel[]>();
    this.http.get<Artikel[]>(`${serverUrl}/artikelen`)
      .subscribe(a => artikelSubject$.next(a));
    artikelSubject$.forEach(a => a.forEach(b => this.artikelen.push(b)));
  }

  getArtikelenByQuery(query: string): void {
    this.artikelen.length = 0;
    let artikelSubject$ = new Subject<Artikel[]>();
    this.http.get<Artikel[]>(`${serverUrl}/artikelen/?q=${query}`)
      .subscribe(a => artikelSubject$.next(a));
    artikelSubject$.forEach(a => a.forEach(b => this.artikelen.push(b)));
  }

  getEigenArtikelen(userId: number): void { // later gebruiken
    this.artikelen.length = 0;
    let artikelSubject$ = new Subject<Artikel[]>();
    this.http.get<Artikel[]>(`${serverUrl}/artikelen/?userId=${userId}`)
      .subscribe(a => artikelSubject$.next(a));
    artikelSubject$.forEach(a => a.forEach(b => this.artikelen.push(b)));
  }
}
