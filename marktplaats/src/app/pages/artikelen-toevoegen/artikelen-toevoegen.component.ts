import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Gebruiker} from "../../model/gebruiker";
import {Artikel} from "../../model/artikel";
import {Router} from "@angular/router";
import {ArtikelService} from "../../services/artikel.service";
import {Bezorgwijze} from "../../model/bezorgwijze";
import {Categorie} from "../../model/categorie";
import {DatePipe} from "@angular/common";
import {CategorieService} from "../../services/categorie.service";
import {DienstCategorie} from "../../model/dienstCategorie";
import {ProductCategorie} from "../../model/productCategorie";

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
  currDate: null | string | Date = new Date();

  diensten: DienstCategorie[] | undefined;
  producten: ProductCategorie[] | undefined;

  categorieen = Object.values(Categorie);
  selectedCategorie: string = "Dienst";


  constructor(
    private artikelService: ArtikelService,
    private categorieService: CategorieService,
    private router: Router,
    private datePipe: DatePipe) {
    this.currDate = this.datePipe.transform(this.currDate, 'yyyy-MM-dd');
    // @ts-ignore
    this.categorieService.getAllDiensten().subscribe(
      (data) => {
        this.diensten = data;
        console.log(this.diensten);
      });
    // @ts-ignore
    this.categorieService.getAllProducten().subscribe(data => this.producten = data);
  }

  ngOnInit(): void {
    this.toevoegenForm = new FormGroup({
      titel: new FormControl('', [Validators.required]),
      beschrijving: new FormControl('', [Validators.required]),
      prijs: new FormControl('', [Validators.required]),
      bezorgwijze: new FormControl(null, [Validators.required]),
      dienstCategorie: new FormControl(null),
      productCategorie: new FormControl(null)
    });
  }

  toevoegen(): void {

    this.toevoegenForm.value.bezorgwijze = Object.keys(Bezorgwijze)[Object.values(Bezorgwijze).indexOf(this.toevoegenForm.value.bezorgwijze)];
    this.toevoegenForm.value.verkoper = this.gebruiker;
    this.toevoegenForm.value.datumAanmaak = this.currDate;

    console.log(this.toevoegenForm.value);
    this.artikelService.add(this.toevoegenForm.value)
    console.log("Artikel toegevoegd");
    this.toevoegenForm.reset();

  }

  selectCategorie(cat: string) {
    this.selectedCategorie = cat;

  }
}
