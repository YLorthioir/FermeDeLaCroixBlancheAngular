import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LOGGED_GUARD, ROLE_GUARD} from "../guard/logged-in.guard";
import {VenteAllComponent} from "./all/vente-all.component";
import {VenteAddComponent} from "./add/vente-add.component";
import {VenteFaucheUpdateComponent} from "./fauche-update/vente-fauche-update.component";
import {VenteComponent} from "./vente/vente.component";
import {VenteBovinUpdateComponent} from "./bovin-update/vente-bovin-update.component";

const routes: Routes = [

  {
    path: '',
    component: VenteComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: VenteAllComponent, canActivate: [ LOGGED_GUARD ]},
      { path: 'add', component: VenteAddComponent, canActivate: [ LOGGED_GUARD ]},
      { path: 'update/fauche/:param', component: VenteFaucheUpdateComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'update/bovin/:param', component: VenteBovinUpdateComponent, canActivate: [ ROLE_GUARD ]},
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class VenteRoutingModule { }
