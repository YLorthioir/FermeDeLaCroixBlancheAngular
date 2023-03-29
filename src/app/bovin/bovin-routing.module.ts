import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BovinComponent} from "./bovin/bovin.component";
import {BovinOneComponent} from "./one/bovin-one.component";

const routes: Routes = [

  {
    path: '',
    component: BovinComponent,
    children: [
      { path: '', redirectTo: 'one', pathMatch: 'full' },
      { path: 'one', component: BovinOneComponent},

    ]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class BovinRoutingModule { }
