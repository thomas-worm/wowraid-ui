import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
import { CharacterCreateComponent } from './user/character/create/create.component';
import { GuideComponent } from './guide/guide.component';
import { McGuideComponent } from './guide/mc/mc.component';
import { LucifronMcGuideComponent } from './guide/mc/lucifron/lucifron.component';
import { MagmadarMcGuideComponent } from './guide/mc/magmadar/magmadar.component';
import { GehennasMcGuideComponent } from './guide/mc/gehennas/gehennas.component';
import { GarrMcGuideComponent } from './guide/mc/garr/garr.component';
import { GeddonMcGuideComponent } from './guide/mc/geddon/geddon.component';
import { ShazzrahMcGuideComponent } from './guide/mc/shazzrah/shazzrah.component';
import { SulfuronMcGuideComponent } from './guide/mc/sulfuron/sulfuron.component';
import { GolemaggMcGuideComponent } from './guide/mc/golemagg/golemagg.component';
import { MajordomusMcGuideComponent } from './guide/mc/majordomus/majordomus.component';
import { RagnarosMcGuideComponent } from './guide/mc/ragnaros/ragnaros.component';
import { DecursiveAddonGuideComponent } from './guide/addon/decursive/decursive.component';
import { OnyxiaGuideComponent } from './guide/onyxia/onyxia.component';
import { RaidComponent } from './raid/raid.component';
import { RaidDetailComponent } from './raid/detail/detail.component';

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
    CharacterCreateComponent,
    GuideComponent,
    McGuideComponent,
    LucifronMcGuideComponent,
    MagmadarMcGuideComponent,
    GehennasMcGuideComponent,
    GarrMcGuideComponent,
    GeddonMcGuideComponent,
    ShazzrahMcGuideComponent,
    SulfuronMcGuideComponent,
    GolemaggMcGuideComponent,
    MajordomusMcGuideComponent,
    RagnarosMcGuideComponent,
    DecursiveAddonGuideComponent,
    OnyxiaGuideComponent,
    RaidComponent,
    RaidDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
