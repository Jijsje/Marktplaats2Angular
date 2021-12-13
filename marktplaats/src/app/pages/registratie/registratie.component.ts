import {Component, Input, OnInit} from '@angular/core';
import {Gebruiker} from "../../model/gebruiker";
import {GebruikerService} from "../../services/gebruiker.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registratie',
  templateUrl: './registratie.component.html',
  styleUrls: ['./registratie.component.css']
})
export class RegistratieComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  gebruiker!: Gebruiker;
  // gebruiker = {} as Gebruiker;

  constructor(
    private formBuilder: FormBuilder,
    private service: GebruikerService,
    private router: Router) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      emailadres: new FormControl('', [Validators.required]),
      adres: new FormControl('', [Validators.required])
    });
  }

  registreren(): void {
    console.log("Registering someone");
    this.service.add(this.registerForm.value)
    this.registerForm.reset();
    this.router.navigate(['/login'])
  }
}

