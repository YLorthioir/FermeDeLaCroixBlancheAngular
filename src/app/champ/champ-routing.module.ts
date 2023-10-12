import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LOGGED_GUARD, ROLE_GUARD} from "../guard/logged-in.guard";
import {ChampComponent} from "./champ/champ.component";
import {ChampAddComponent} from "./add/champ-add.component";
import {ChampUpdateComponent} from "./update/champ-update.component";
import {AddCultureComponent} from "./add-culture/add-culture.component";
import {UpdateCultureComponent} from "./update-culture/update-culture.component";
import {AllCultureComponent} from "./all-culture/all-culture.component";
import {AddFaucheComponent} from "./add-fauche/add-fauche.component";
import {UpdateFaucheComponent} from "./update-fauche/update-fauche.component";
import {AllFaucheComponent} from "./all-fauche/all-fauche.component";
import {ExtraParamsChampComponent} from "./extra-params-champ/extra-params-champ.component";


const routes: Routes = [

  {
    path: '',
    component: ChampComponent,
    children: [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: 'update', component: ChampUpdateComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'add', component: ChampAddComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'culture/add', component: AddCultureComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'culture/update/:param', component: UpdateCultureComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'culture/all', component: AllCultureComponent, canActivate: [ LOGGED_GUARD ]},
      { path: 'fauche/add', component: AddFaucheComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'fauche/update/:param', component: UpdateFaucheComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'fauche/all', component: AllFaucheComponent, canActivate: [ LOGGED_GUARD ]},
      { path: 'parametresSupp', component: ExtraParamsChampComponent, canActivate: [ ROLE_GUARD ]},
    ]
  }

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class ChampRoutingModule { }
