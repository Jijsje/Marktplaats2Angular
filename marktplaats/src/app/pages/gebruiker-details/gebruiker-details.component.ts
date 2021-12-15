import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GebruikerService} from "../../services/gebruiker.service";
import {Gebruiker} from "../../model/gebruiker";

@Component({
  selector: 'app-gebruiker-details',
  templateUrl: './gebruiker-details.component.html',
  styleUrls: ['./gebruiker-details.component.css']
})
export class GebruikerDetailsComponent implements OnInit {
  gebruikerForm!: FormGroup;

  gebruikerJsonObj : any = JSON.parse(<string>localStorage.getItem("loggedInUser"));
  gebruiker: Gebruiker = <Gebruiker>this.gebruikerJsonObj;
  // @ts-ignore
  id = this.gebruiker.id|null;

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: GebruikerService) {
  }

  ngOnInit(): void {

    this.gebruikerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      emailadres: new FormControl('', [Validators.required]),
      adres: new FormControl('')
    });

    console.log(this.id);
    this.service.get(this.id).subscribe(g => {
        console.log(g);
        this.gebruikerForm.patchValue(g); // fill the form with the gotten contact
      }
    );
  }

  save(): void {
    console.log(this.gebruiker);
    this.gebruiker.username = this.gebruikerForm.value.username
    this.gebruiker.emailadres = this.gebruikerForm.value.emailadres
    this.gebruiker.adres = this.gebruikerForm.value.adres
    this.gebruiker.token = "";
    this.service.update(this.gebruiker, this.id);
    localStorage.setItem('loggedInUser', JSON.stringify(this.gebruiker));
  }
}
