import {Gebruiker} from "./gebruiker";

export interface Artikel {
  id: number;
  titel: string;
  verkoper: Gebruiker["username"];
}


