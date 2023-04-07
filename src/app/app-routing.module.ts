import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {LOGGED_GUARD, ROLE_GUARD} from "./guard/logged-in.guard";

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [ LOGGED_GUARD ] },
  { path: 'bovin', loadChildren: () => import('./bovin/bovin.module').then(m => m.BovinModule), canActivate: [ LOGGED_GUARD ] },
  { path: 'sante', loadChildren: () => import('./sante/sante.module').then(m => m.SanteModule), canActivate: [ ROLE_GUARD ]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
