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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'anmeldung', component: AnmeldungComponent },
  { path: 'aufstellung', component: AufstellungComponent, canActivate: [ AuthGuardService ] },
  { path: 'lootregeln', component: LootregelnComponent },
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
