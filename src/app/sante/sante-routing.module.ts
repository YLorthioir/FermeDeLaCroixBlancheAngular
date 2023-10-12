import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SanteComponent} from "./sante/sante.component";
import {VaccinationComponent} from "./vaccination/vaccination.component";
import {VaccinGestionComponent} from "./vaccin-gestion/vaccin-gestion.component";
import {ROLE_GUARD} from "../guard/logged-in.guard";
import {MaladieTraitementComponent} from "./maladie-traitement/maladie-traitement.component";
import {
  MaladieTraitementSelectedComponent
} from "./maladie-traitement/maladie-traitement-selected/maladie-traitement-selected.component";



const routes: Routes = [

  {
    path: '',
    component: SanteComponent,
    children: [
      { path: '', redirectTo: 'vaccination', pathMatch: 'full' },
      { path: 'vaccination', component: VaccinationComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'gestion', component: VaccinGestionComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'maladie', component: MaladieTraitementComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'maladie/:param', component: MaladieTraitementSelectedComponent, canActivate: [ ROLE_GUARD ]},
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class SanteRoutingModule { }
