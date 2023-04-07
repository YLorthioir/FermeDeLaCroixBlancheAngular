import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {RegisterComponent} from "./register/register.component";
import {LOGGED_GUARD, ROLE_GUARD} from "../guard/logged-in.guard";


const routes: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent, canActivate: [ LOGGED_GUARD ] },
      { path: 'register', component: RegisterComponent, canActivate: [ ROLE_GUARD] },
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
