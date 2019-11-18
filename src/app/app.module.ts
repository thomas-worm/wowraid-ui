import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AufstellungComponent } from './aufstellung/aufstellung.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImpressumComponent,
    AufstellungComponent,
    AnmeldungComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
