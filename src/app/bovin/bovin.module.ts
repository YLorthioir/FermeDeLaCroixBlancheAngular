import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BovinComponent } from './bovin/bovin.component';
import {RouterOutlet} from "@angular/router";
import { BovinOneComponent } from './one/bovin-one.component';
import {BovinRoutingModule} from "./bovin-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BovinComponent,
    BovinOneComponent
  ],
  imports: [
    CommonModule,
    BovinRoutingModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ]
})
export class BovinModule { }
