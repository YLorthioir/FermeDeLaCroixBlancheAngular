import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BovinComponent} from "./bovin/bovin.component";
import {BovinOneComponent} from "./one/bovin-one.component";
import {BovinAddComponent} from "./add/bovin-add.component";
import {BovinUpdateComponent} from "./update/bovin-update.component";
import {BovinGenealogyComponent} from "./genealogy/bovin-genealogy.component";
import {ExtraParamsComponent} from "./extra-params/extra-params.component";
import {BovinOneSelectedComponent} from "./one/one-selected/bovin-one-selected.component";
import {BovinGenealogySelectedComponent} from "./genealogy/bovin-genealogy-selected/bovin-genealogy-selected.component";
import {BovinUpdateSelectedComponent} from "./update/bovin-update-selected/bovin-update-selected.component";
import {LOGGED_GUARD, ROLE_GUARD} from "../guard/logged-in.guard";

const routes: Routes = [

  {
    path: '',
    component: BovinComponent,
    children: [
      { path: '', redirectTo: 'one', pathMatch: 'full' },
      { path: 'one', component: BovinOneComponent, canActivate: [ LOGGED_GUARD ]},
      { path: 'one/:param', component: BovinOneSelectedComponent, canActivate: [ LOGGED_GUARD ]},
      { path: 'add', component: BovinAddComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'update', component: BovinUpdateComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'update/:param', component: BovinUpdateSelectedComponent, canActivate: [ ROLE_GUARD ]},
      { path: 'genealogy', component: BovinGenealogyComponent, canActivate: [ LOGGED_GUARD ]},
      { path: 'genealogy/:param', component: BovinGenealogySelectedComponent, canActivate: [ LOGGED_GUARD ]},
      { path: 'parametresSupp', component: ExtraParamsComponent, canActivate: [ ROLE_GUARD ]},
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class BovinRoutingModule { }
