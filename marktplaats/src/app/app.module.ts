import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegistratieComponent} from './pages/registratie/registratie.component';
import {ArtikelenComponent} from "./pages/artikelen/artikelen.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from "./utils/jwt.interceptor";
import {AuthGuard} from "./utils/auth.guard";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {GebruikerDetailsComponent } from './pages/gebruiker-details/gebruiker-details.component';
import {CommonModule} from "@angular/common";
import { ArtikelenToevoegenComponent } from './pages/artikelen-toevoegen/artikelen-toevoegen.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistratieComponent,
    NavbarComponent,
    GebruikerDetailsComponent,
    ArtikelenComponent,
    ArtikelenToevoegenComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'registratie', component: RegistratieComponent},
      {path: 'details', component: GebruikerDetailsComponent, canActivate: [AuthGuard]},
      {path: 'artikelen', component: ArtikelenComponent},
      {path: 'artikel-toevoegen', component: ArtikelenToevoegenComponent, canActivate: [AuthGuard]}

    ]),
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
