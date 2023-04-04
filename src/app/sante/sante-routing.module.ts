import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SanteComponent} from "./sante/sante.component";
import {VaccinationComponent} from "./vaccination/vaccination.component";
import {VaccinGestionComponent} from "./vaccin-gestion/vaccin-gestion.component";



const routes: Routes = [

  {
    path: '',
    component: SanteComponent,
    children: [
      { path: '', redirectTo: 'vaccination', pathMatch: 'full' },
      { path: 'vaccination', component: VaccinationComponent},
      { path: 'gestion', component: VaccinGestionComponent},

    ]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class SanteRoutingModule { }
