import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Artikel} from "../../model/artikel";
import {serverUrl} from "../../../environments/environment";
import {Subject} from "rxjs";

@Component({
  selector: 'app-mijn-aanbod',
  templateUrl: './mijn-aanbod.component.html',
  styleUrls: ['./mijn-aanbod.component.css']
})
export class MijnAanbodComponent implements OnInit {

  artikelen: Artikel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // userId dynamisch laten vullen
    this.getEigenArtikelen(1);
  }

  getEigenArtikelen(userId: number): void {
    let artikelSubject$ = new Subject<Artikel[]>();
    this.http.get<Artikel[]>(`${serverUrl}/artikelen/?userId=${userId}`)
      .subscribe(a => artikelSubject$.next(a));
    artikelSubject$.forEach(a => a.forEach(b => this.artikelen.push(b)));
  }
}
