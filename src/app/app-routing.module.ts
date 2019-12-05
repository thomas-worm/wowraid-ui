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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'anmeldung', component: AnmeldungComponent },
  { path: 'aufstellung', component: AufstellungComponent, canActivate: [ AuthGuardService ] },
  { path: 'lootregeln', component: LootregelnComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'guide/mc', component: McGuideComponent },
  { path: 'guide/addon/decursive', component: DecursiveAddonGuideComponent },
  { path: 'user', component: UserComponent, canActivate: [ AuthGuardService ] },
  { path: 'user/characters', component: CharacterComponent, canActivate: [ AuthGuardService ] },
  { path: 'user/character/create', component: CharacterCreateComponent, canActivate: [ AuthGuardService ] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
