import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AufstellungComponent } from './aufstellung/aufstellung.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'anmeldung', component: AnmeldungComponent },
  { path: 'aufstellung', component: AufstellungComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
