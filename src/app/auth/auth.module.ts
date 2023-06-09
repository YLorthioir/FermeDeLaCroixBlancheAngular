import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import {RouterOutlet} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AuthRoutingModule} from "./auth-routing.module";
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    AuthRoutingModule,
    MatSelectModule
  ]
})
export class AuthModule { }
