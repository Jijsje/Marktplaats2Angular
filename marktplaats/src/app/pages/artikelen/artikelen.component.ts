import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../../../environments/environment";
import {Artikel} from "../../model/artikel";
import {Observable, Subject, Subscription} from "rxjs";
import {Gebruiker} from "../../model/gebruiker";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artikelen',
  templateUrl: './artikelen.component.html',
  styleUrls: ['./artikelen.component.css']
})
export class ArtikelenComponent implements OnInit {

  public verkoper: Gebruiker
  public artikelen: Artikel[];

  constructor(private http: HttpClient, private router: Router) {
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

  // TODO: van de verkoper moet alleen de username worden weergegeven

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
