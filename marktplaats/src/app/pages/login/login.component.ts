import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Gebruiker} from "../../model/gebruiker";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  gebruiker = {} as Gebruiker;
  message$ = this.service.message$;

  constructor(private service: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  login(): void {
    console.log("Logging in ");
    this.service.loggedIn$.subscribe(success=>this.router.navigate(['/home']))
    this.service.login(this.gebruiker);
    this.gebruiker = {} as Gebruiker;
  }

}
