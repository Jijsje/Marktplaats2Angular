import {Component, OnInit} from '@angular/core';
import {Gebruiker} from "../../model/gebruiker";
import {GebruikerService} from "../../services/gebruiker.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registratie',
  templateUrl: './registratie.component.html',
  styleUrls: ['./registratie.component.css']
})
export class RegistratieComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  gebruiker = {} as Gebruiker;

  constructor(
    private formBuilder: FormBuilder,
    private service: GebruikerService,
              private router: Router,) {
  }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  registreren(): void {
    this.service.add(this.gebruiker)
    this.router.navigate(['/login'])
  }
}

