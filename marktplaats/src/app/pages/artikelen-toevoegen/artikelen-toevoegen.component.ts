import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Gebruiker} from "../../model/gebruiker";
import {Artikel} from "../../model/artikel";
import {Router} from "@angular/router";
import {ArtikelService} from "../../services/artikel.service";
import {Bezorgwijze} from "../../model/bezorgwijze";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-artikelen-toevoegen',
  templateUrl: './artikelen-toevoegen.component.html',
  styleUrls: ['./artikelen-toevoegen.component.css'],
  providers: [DatePipe]
})
export class ArtikelenToevoegenComponent implements OnInit {
  toevoegenForm!: FormGroup;
  artikel!: Artikel;

  gebruikerJsonObj: any = JSON.parse(<string>localStorage.getItem("loggedInUser"));
  gebruiker: Gebruiker = <Gebruiker>this.gebruikerJsonObj;
  bezorgwijzes = Object.values(Bezorgwijze);
  currDate: null|string|Date = new Date();

  constructor(
    private service: ArtikelService,
    private router: Router,
    private datePipe: DatePipe) {
    this.currDate = this.datePipe.transform(this.currDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.toevoegenForm = new FormGroup({
      titel: new FormControl('', [Validators.required]),
      beschrijving: new FormControl('', [Validators.required]),
      prijs: new FormControl('', [Validators.required]),

      bezorgwijze: new FormControl(null, [Validators.required])
    });
  }

  toevoegen(): void {

    this.toevoegenForm.value.bezorgwijze = Object.keys(Bezorgwijze)[Object.values(Bezorgwijze).indexOf(this.toevoegenForm.value.bezorgwijze)];
    this.toevoegenForm.value.verkoper = this.gebruiker;
    this.toevoegenForm.value.datumAanmaak = this.currDate;
    console.log(this.toevoegenForm.value);
    this.service.add(this.toevoegenForm.value)
    console.log("Artikel toegevoegd");
    this.toevoegenForm.reset();

  }
}
