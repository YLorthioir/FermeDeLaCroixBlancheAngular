import {Component, OnInit} from '@angular/core';
import {BovinService} from "../../service/bovin.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Bovin} from "../../models/bovin/bovin";
import {SanteService} from "../../service/sante.service";
import {Vaccination} from "../../models/sante/vaccination";
import {A} from "../../models/sante/a";
import {BovinEngraissement} from "../../models/bovin/bovinEngraissement";
import {FemelleReproduction} from "../../models/bovin/femelleReproduction";

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
  femelleReproduction!: FemelleReproduction;
  bovinEngraissement!: BovinEngraissement;

  myControl = new FormControl('BE');

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
        this.bovin = bovin;

        this._santeService.getCarnetVaccination(this.bovin.id).subscribe(
          (carnet) =>
            this.carnet = carnet);

        this._santeService.getA(this.bovin.id).subscribe(
          (a) =>
            this.aCommeMaladie = a);

        this._bovinService.getInfosReproduction(this.bovin.id).subscribe(
          (f) =>
            this.femelleReproduction = f
        );

        this._bovinService.getInfosEngraissement(this.bovin.id).subscribe(
          (b) =>
            this.bovinEngraissement = b
        );


        this.loading=false;

    })
  }
}
