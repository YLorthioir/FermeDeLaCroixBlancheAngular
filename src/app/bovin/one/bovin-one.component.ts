import {Component, OnInit} from '@angular/core';
import {BovinService} from "../../service/bovin.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Bovin} from "../../models/bovin/bovin";
import {SanteService} from "../../service/sante.service";
import {Vaccination} from "../../models/sante/vaccination";
import {A} from "../../models/sante/a";

@Component({
  selector: 'app-bovin-one',
  templateUrl: './bovin-one.component.html',
  styleUrls: ['./bovin-one.component.css']
})
export class BovinOneComponent implements OnInit{

  loading: boolean = false
  bovin!: Bovin;
  bovins!: string[];
  carnet!: Vaccination[];
  filteredOptions!: Observable<string[]>;
  aCommeMaladie!: A[];

  myControl = new FormControl('Test');

  constructor(private readonly _bovinService: BovinService,
              private readonly _santeService: SanteService) {
    }

  ngOnInit(): void {

    this._bovinService.getAll().subscribe(
      (bovin) => {
        this.bovins = bovin.map((b)=>b.numeroInscription);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    )
  }

  private _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this.bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  OnBovinSelected(option: string){
    this.loading=true;

    this._bovinService.getOne(option).subscribe((bovin) => {
        this.bovin = bovin
        this._santeService.getCarnetVaccination(bovin.id).subscribe(
          (carnet) =>
            this.carnet = carnet);
        this._santeService.getA(bovin.id).subscribe(
          (a) =>
            this.aCommeMaladie = a)
        this.loading=false;

    })
  }
}
