import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BovinComponent } from './bovin/bovin.component';
import { BovinOneComponent } from './one/bovin-one.component';
import {BovinRoutingModule} from "./bovin-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { BovinAddComponent } from './add/bovin-add.component';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import { BovinUpdateComponent } from './update/bovin-update.component';
import { BovinGenealogyComponent } from './genealogy/bovin-genealogy.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import { ExtraParamsComponent } from './extra-params/extra-params.component';



@NgModule({
  declarations: [
    BovinComponent,
    BovinOneComponent,
    BovinAddComponent,
    BovinUpdateComponent,
    BovinGenealogyComponent,
    ExtraParamsComponent
  ],
  imports: [
    CommonModule,
    BovinRoutingModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
  ]
})
export class BovinModule { }
