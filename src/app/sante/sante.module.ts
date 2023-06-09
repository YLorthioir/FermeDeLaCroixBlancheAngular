import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VaccinationComponent} from "./vaccination/vaccination.component";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {SanteRoutingModule} from "./sante-routing.module";
import { SanteComponent } from './sante/sante.component';
import { VaccinGestionComponent } from './vaccin-gestion/vaccin-gestion.component';
import { MaladieTraitementComponent } from './maladie-traitement/maladie-traitement.component';
import { MaladieTraitementSelectedComponent } from './maladie-traitement/maladie-traitement-selected/maladie-traitement-selected.component';



@NgModule({
  declarations: [
    VaccinationComponent,
    SanteComponent,
    VaccinGestionComponent,
    MaladieTraitementComponent,
    MaladieTraitementSelectedComponent
  ],
    imports: [
        CommonModule,
        SanteRoutingModule,
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
export class SanteModule { }
