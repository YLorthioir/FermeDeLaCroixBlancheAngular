import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampAddComponent } from './add/champ-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {ChampRoutingModule} from "./champ-routing.module";
import {ChampComponent} from "./champ/champ.component";
import { ChampUpdateComponent } from './update/champ-update.component';
import { AddCultureComponent } from './add-culture/add-culture.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import { UpdateCultureComponent } from './update-culture/update-culture.component';
import { AllCultureComponent } from './all-culture/all-culture.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AddFaucheComponent } from './add-fauche/add-fauche.component';
import { UpdateFaucheComponent } from './update-fauche/update-fauche.component';
import { AllFaucheComponent } from './all-fauche/all-fauche.component';
import { ExtraParamsChampComponent } from './extra-params-champ/extra-params-champ.component';



@NgModule({
  declarations: [
    ChampComponent,
    ChampAddComponent,
    ChampUpdateComponent,
    AddCultureComponent,
    UpdateCultureComponent,
    AllCultureComponent,
    AddFaucheComponent,
    UpdateFaucheComponent,
    AllFaucheComponent,
    ExtraParamsChampComponent
  ],
  imports: [
    CommonModule,
    ChampRoutingModule,
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
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ]
})
export class ChampModule { }
