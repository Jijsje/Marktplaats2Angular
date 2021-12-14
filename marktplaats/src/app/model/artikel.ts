import {Gebruiker} from "./gebruiker";
import {Bezorgwijze} from "./bezorgwijze";

export interface Artikel {
  id: number;
  titel: string;
  beschrijving: string;
  prijs: number;
  bezorgwijze: Bezorgwijze;
  verkoper: Gebruiker;
}


