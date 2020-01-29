import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AufstellungComponent } from './aufstellung/aufstellung.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { LootregelnComponent } from './lootregeln/lootregeln.component';
import { AuthGuardService } from './auth-guard.service';
import { UserComponent } from './user/user.component';
import { CharacterComponent } from './user/character/character.component';
import { CharacterCreateComponent } from './user/character/create/create.component';
import { GuideComponent } from './guide/guide.component';
import { McGuideComponent } from './guide/mc/mc.component';
import { DecursiveAddonGuideComponent } from './guide/addon/decursive/decursive.component';
import { OnyxiaGuideComponent } from './guide/onyxia/onyxia.component';
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
import { RaidComponent } from './raid/raid.component';
import { RaidDetailComponent } from './raid/detail/detail.component';
import { AdminComponent } from './admin/admin.component';
import { RaidEventComponent } from './admin/event/raid/raid.component';
import { CreateRaidEventComponent } from './admin/event/raid/create/create.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'anmeldung', component: AnmeldungComponent },
  { path: 'aufstellung', component: AufstellungComponent, canActivate: [ AuthGuardService ] },
  { path: 'lootregeln', component: LootregelnComponent },
  { path: 'raids', component: RaidComponent, canActivate: [ AuthGuardService ] },
  { path: 'raid/:key', component: RaidDetailComponent, canActivate: [ AuthGuardService ] },
  { path: 'guide', component: GuideComponent },
  { path: 'guide/mc', component: McGuideComponent },
  { path: 'guide/mc/lucifron', component: LucifronMcGuideComponent },
  { path: 'guide/mc/magmadar', component: MagmadarMcGuideComponent },
  { path: 'guide/mc/gehennas', component: GehennasMcGuideComponent },
  { path: 'guide/mc/garr', component: GarrMcGuideComponent },
  { path: 'guide/mc/geddon', component: GeddonMcGuideComponent },
  { path: 'guide/mc/shazzrah', component: ShazzrahMcGuideComponent },
  { path: 'guide/mc/sulfuron', component: SulfuronMcGuideComponent },
  { path: 'guide/mc/golemagg', component: GolemaggMcGuideComponent },
  { path: 'guide/mc/majordomus', component: MajordomusMcGuideComponent },
  { path: 'guide/mc/ragnaros', component: RagnarosMcGuideComponent },
  { path: 'guide/onyxia', component: OnyxiaGuideComponent },
  { path: 'guide/addon/decursive', component: DecursiveAddonGuideComponent },
  { path: 'user', component: UserComponent, canActivate: [ AuthGuardService ] },
  { path: 'user/characters', component: CharacterComponent, canActivate: [ AuthGuardService ] },
  { path: 'user/character/create', component: CharacterCreateComponent, canActivate: [ AuthGuardService ] },
  { path: 'admin', component: AdminComponent, canActivate: [ AuthGuardService ] },
  { path: 'admin/raids', component: RaidEventComponent, canActivate: [ AuthGuardService ] },
  { path: 'admin/raid/create', component: CreateRaidEventComponent, canActivate: [ AuthGuardService ] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
