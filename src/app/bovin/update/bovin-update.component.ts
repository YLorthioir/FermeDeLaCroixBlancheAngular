import {Component, OnInit} from '@angular/core';
import {Bovin} from "../../models/bovin/bovin";
import {Vaccination} from "../../models/sante/vaccination";
import {map, Observable, startWith} from "rxjs";
import {A} from "../../models/sante/a";
import {FormControl, FormGroup} from "@angular/forms";
import {BovinService} from "../../service/bovin.service";
import {SanteService} from "../../service/sante.service";
import {Race} from "../../models/bovin/race";
import {RaceService} from "../../service/race.service";

@Component({
  selector: 'app-bovin-update',
  templateUrl: './bovin-update.component.html',
  styleUrls: ['./bovin-update.component.css']
})
export class BovinUpdateComponent implements OnInit{

  loading: boolean = false
  bovin!: Bovin;
  bovins!: string[];
  carnet!: Vaccination[];
  filteredOptions!: Observable<string[]>;
  aCommeMaladie!: A[];
  races!: Race[];

  myControl = new FormControl('Test');

  formInformations!: FormGroup;

  constructor(private readonly _bovinService: BovinService,
              private readonly _raceService: RaceService,
              private readonly _santeService: SanteService) {
    this.formInformations = new FormGroup({
      numeroInscription: new FormControl(''),
      nom: new FormControl(''),
      raceId: new FormControl(''),
      sexe: new FormControl(''),
      pereNI: new FormControl(''),
      mereNI: new FormControl(''),
      dateDeNaissance: new FormControl(''),
      poidsNaissance: new FormControl(''),
      neCesarienne: new FormControl(''),
      enCharge: new FormControl(''),
      champ: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this._raceService.getAllRace().subscribe(
      (races)=> {
        this.races = races;
      }
    )

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

      this.setFormInformation()

    })
  }

  setFormInformation(){
    this.formInformations = new FormGroup({
      numeroInscription: new FormControl(this.bovin.numeroInscription),
      nom: new FormControl(this.bovin.nom),
      raceId: new FormControl(this.bovin.race.id),
      sexe: new FormControl(this.bovin.sexe),
      pereNI: new FormControl(this.bovin.pereNI),
      mereNI: new FormControl(this.bovin.mereNI),
      dateDeNaissance: new FormControl(this.bovin.dateDeNaissance),
      poidsNaissance: new FormControl(this.bovin.poidsNaissance),
      neCesarienne: new FormControl(this.bovin.neCesarienne),
      enCharge: new FormControl(this.bovin.enCharge),
      champ: new FormControl(''),
    })
  }
}
