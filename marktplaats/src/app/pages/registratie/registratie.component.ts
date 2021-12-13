import {Component, Input, OnInit} from '@angular/core';
import {Gebruiker} from "../../model/gebruiker";
import {GebruikerService} from "../../services/gebruiker.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Bezorgwijze} from "../../model/bezorgwijze"
@Component({
  selector: 'app-registratie',
  templateUrl: './registratie.component.html',
  styleUrls: ['./registratie.component.css']
})
export class RegistratieComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  gebruiker!: Gebruiker;

  bezorgwijzes = Object.values(Bezorgwijze);

  constructor(
    private formBuilder: FormBuilder,
    private service: GebruikerService,
    private router: Router) {

  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      emailadres: new FormControl('', [Validators.required]),
      adres: new FormControl(''),
      bezorgwijze: new FormControl(null, [Validators.required])
    });
  }

  registreren(): void {
    console.log("Registering someone");
    this.registerForm.value.bezorgwijze = Object.keys(Bezorgwijze)[Object.values(Bezorgwijze).indexOf(this.registerForm.value.bezorgwijze)];
    this.service.add(this.registerForm.value)
    this.registerForm.reset();
    this.router.navigate(['/login'])
  }
}

