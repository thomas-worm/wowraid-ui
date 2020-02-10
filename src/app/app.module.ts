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
import { RaidAttendeeComponent } from './raid/attendee/attendee.component';
import { RaidAttendeeListComponent } from './raid/attendee-list/attendee-list.component';
import { CharacterDataComponent } from './data/character/character.component';
import { ItemDataComponent } from './data/item/item.component';
import { LootDataComponent } from './data/loot/loot.component';
import { AdminComponent } from './admin/admin.component';
import { RaidEventComponent } from './admin/event/raid/raid.component';
import { CreateRaidEventComponent } from './admin/event/raid/create/create.component';
import { EventAttendeeAdminComponent } from './admin/event/attendee/attendee.component';
import { EventAttendeeAdminCreateComponent } from './admin/event/attendee/create/create.component';
import { EpgpComponent } from './epgp/epgp.component';
import { EpgpAccountComponent } from './epgp/account/account.component';
import { EpGpAccountTransactionComponent } from './epgp/account/transaction/transaction.component';
import { EventLootAdminComponent } from './admin/event/loot/loot.component';
import { EventLootCreateAdminComponent } from './admin/event/loot/create/create.component';

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
    RaidDetailComponent,
    RaidAttendeeComponent,
    RaidAttendeeListComponent,
    CharacterDataComponent,
    ItemDataComponent,
    LootDataComponent,
    AdminComponent,
    RaidEventComponent,
    CreateRaidEventComponent,
    EventAttendeeAdminComponent,
    EventAttendeeAdminCreateComponent,
    EpgpComponent,
    EpgpAccountComponent,
    EpGpAccountTransactionComponent,
    EventLootAdminComponent,
    EventLootCreateAdminComponent
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
