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
  styleUrls: ['./bovin-one.component.scss']
})
export class BovinOneComponent implements OnInit{

  private _loading: boolean = false
  private _bovin!: Bovin;
  private _bovins!: string[];
  private _carnet!: Vaccination[];
  private _filteredOptions!: Observable<string[]>;
  private _aCommeMaladie!: A[];
  private _femelleReproduction!: FemelleReproduction;
  private _bovinEngraissement!: BovinEngraissement;

  private _myControl = new FormControl('BE');

  constructor(private readonly _bovinService: BovinService,
              private readonly _santeService: SanteService) {
    }

  ngOnInit(): void {

    this._bovinService.getAll().subscribe(
      (bovin) => {
        this._bovins = bovin.map((b)=>b.numeroInscription);
        this._filteredOptions = this._myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    )
  }

  private _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this._bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  OnBovinSelected(option: string){
    this._loading=true;

    this._bovinService.getOne(option).subscribe((bovin) => {
        this._bovin = bovin;

        this._santeService.getCarnetVaccination(this._bovin.id).subscribe(
          (carnet) =>
            this._carnet = carnet);

        this._santeService.getA(this._bovin.id).subscribe(
          (a) =>
            this._aCommeMaladie = a);

        this._bovinService.getInfosReproduction(this._bovin.id).subscribe(
          (f) =>
            this._femelleReproduction = f
        );

        this._bovinService.getInfosEngraissement(this._bovin.id).subscribe(
          (b) =>
            this._bovinEngraissement = b
        );


        this._loading=false;

    })
  }

  //Encaspulation


  get loading(): boolean {
    return this._loading;
  }

  get bovin(): Bovin {
    return this._bovin;
  }

  get carnet(): Vaccination[] {
    return this._carnet;
  }

  get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }

  get aCommeMaladie(): A[] {
    return this._aCommeMaladie;
  }

  get femelleReproduction(): FemelleReproduction {
    return this._femelleReproduction;
  }

  get bovinEngraissement(): BovinEngraissement {
    return this._bovinEngraissement;
  }

  get myControl(): FormControl<string | null> {
    return this._myControl;
  }
}
