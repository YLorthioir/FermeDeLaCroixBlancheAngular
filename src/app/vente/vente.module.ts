import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenteComponent } from './vente/vente.component';
import {RouterOutlet} from "@angular/router";
import { VenteAllComponent } from './all/vente-all.component';
import { VenteUpdateComponent } from './update/vente-update.component';
import { VenteAddComponent } from './add/vente-add.component';
import {VenteRoutingModule} from "./vente-routing.module";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    VenteComponent,
    VenteAllComponent,
    VenteUpdateComponent,
    VenteAddComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    VenteRoutingModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ]
})
export class VenteModule { }
