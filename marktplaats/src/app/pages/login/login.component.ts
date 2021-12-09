import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Gebruiker} from "../../model/gebruiker";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  gebruiker = {} as Gebruiker;
  message$ = this.service.message$;

  constructor(private service: AuthenticationService) {
  }

  login(): void {
    this.service.login(this.gebruiker);
    this.gebruiker = {} as Gebruiker;
  }

}
