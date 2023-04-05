import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BovinComponent} from "./bovin/bovin.component";
import {BovinOneComponent} from "./one/bovin-one.component";
import {BovinAddComponent} from "./add/bovin-add.component";
import {BovinUpdateComponent} from "./update/bovin-update.component";
import {BovinGenealogyComponent} from "./genealogy/bovin-genealogy.component";
import {ExtraParamsComponent} from "./extra-params/extra-params.component";

const routes: Routes = [

  {
    path: '',
    component: BovinComponent,
    children: [
      { path: '', redirectTo: 'one', pathMatch: 'full' },
      { path: 'one', component: BovinOneComponent},
      { path: 'add', component: BovinAddComponent},
      { path: 'update', component: BovinUpdateComponent},
      { path: 'genealogy', component: BovinGenealogyComponent},
      { path: 'parametresSupp', component: ExtraParamsComponent},
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class BovinRoutingModule { }
