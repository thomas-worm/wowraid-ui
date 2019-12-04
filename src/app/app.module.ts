import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AufstellungComponent } from './aufstellung/aufstellung.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { AuthService } from './auth.service';
import { LootregelnComponent } from './lootregeln/lootregeln.component';
import { UserComponent } from './user/user.component';
import { CharacterComponent } from './user/character/character.component';
import { CreateComponent } from './user/character/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImpressumComponent,
    AufstellungComponent,
    AnmeldungComponent,
    LootregelnComponent,
    UserComponent,
    CharacterComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
