import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Gebruiker} from "../../model/gebruiker";
import {Router} from "@angular/router";
import {GebruikerService} from "../../services/gebruiker.service";

@Component({
  selector: 'app-gebruiker-details',
  templateUrl: './gebruiker-details.component.html',
  styleUrls: ['./gebruiker-details.component.css']
})
export class GebruikerDetailsComponent implements OnInit {
  // gebruikerForm: FormGroup;
  // gebruiker: Gebruiker;


  constructor(private router: Router,
              private fb: FormBuilder,
             private service: GebruikerService) {}

  ngOnInit(): void {
    // this.ser
  }
  save(): void {
    // console.log(this.gebruiker);
    // this.service.update(this.gebruikerForm.value, this.gebruiker.id);
    // this.router.navigate(['/contacts']);
  }
}
