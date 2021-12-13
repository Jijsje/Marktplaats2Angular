import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../../../environments/environment";
import {Artikel} from "../../model/artikel";
import {Observable, Subject, Subscription} from "rxjs";
import {Gebruiker} from "../../model/gebruiker";

@Component({
  selector: 'app-artikelen',
  templateUrl: './artikelen.component.html',
  styleUrls: ['./artikelen.component.css']
})
export class ArtikelenComponent implements OnInit {

  public verkoper: Gebruiker
  public artikelen: Artikel[];

  constructor(private http: HttpClient) {
    this.verkoper = {
      id: 20,
      username: "Marley",
      emailadres: "marley@mail.com",
      wachtwoord: "geheim",
      token: "12"
    };

    this.artikelen = [
      {id:1, titel:"Boter", verkoper:this.verkoper.username},
      {id:2, titel:"Kaas", verkoper:this.verkoper.username},
      {id:3, titel:"Eieren", verkoper:this.verkoper.username},
      {id:4, titel:"Hagelslag", verkoper:this.verkoper.username}
    ];
  }

  ngOnInit(): void {
    console.log("ngOnInit aangeroepen")
    this.getArtikelen();
  }

  getArtikelen(): void {
    let artikelSubject$ = new Subject<Artikel[]>();
    this.http.get<Artikel[]>(`${serverUrl}/artikelen`)
      .subscribe(a => artikelSubject$.next(a));
    artikelSubject$.forEach(a => a.forEach(b => this.artikelen.push(b)));
  }

  getArtikel(artikelId: number): void { // later
    let artikelSubject$ = new Subject<Artikel[]>();
    this.http.get<Artikel[]>(`${serverUrl}/artikelen/${artikelId}`)
      .subscribe(a => artikelSubject$.next(a));
    artikelSubject$.forEach(a => a.forEach(b => this.artikelen.push(b)));
  }

  getEigenArtikelen(userId: number): void { // queryparameter meegeven zoals: ?userId=99
    let artikelSubject$ = new Subject<Artikel[]>();
    this.http.get<Artikel[]>(`${serverUrl}/artikelen/?userId=${userId}`)
      .subscribe(a => artikelSubject$.next(a));
    artikelSubject$.forEach(a => a.forEach(b => this.artikelen.push(b)));
  }
}
