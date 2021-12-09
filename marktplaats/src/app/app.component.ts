import {Component} from '@angular/core';
import {Gebruiker} from "./model/gebruiker";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn$ = this.service.loggedIn$;
  loggedOut$ = this.service.loggedOut$;

  loggedIn = false;
  logLabel = 'Login';
  logLink = 'login';
  loggedInMessage = 'Not logged in.';

  constructor(private router: Router,
              private service: AuthenticationService) {
    this.loggedIn$.subscribe((u) => {
      this.loggedIn = true;
      this.logLabel = 'Logout';
      this.logLink = 'logout';
      this.loggedInMessage = `Logged in as ${u}.`;
    });

    this.loggedOut$.subscribe((u) => {
      this.loggedIn = false;
      this.logLabel = 'Login';
      this.logLink = 'login';
      this.loggedInMessage = 'Not logged in.';
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.service.logout();
    this.router.navigate(['/login'])
  }
}
