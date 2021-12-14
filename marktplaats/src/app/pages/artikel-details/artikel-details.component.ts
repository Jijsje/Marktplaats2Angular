import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Artikel} from "../../model/artikel";
import {serverUrl} from "../../../environments/environment";
import {ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'app-artikel-details',
  templateUrl: './artikel-details.component.html',
  styleUrls: ['./artikel-details.component.css']
})
export class ArtikelDetailsComponent implements OnInit {

  public _artikel = {} as Artikel;

  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getArtikel(params['id']));
  }

  getArtikel(artikelId: String) {
    this.http.get<Artikel>(`${serverUrl}/artikelen/${artikelId}`)
      .subscribe(a => this._artikel = a)
  }
}
