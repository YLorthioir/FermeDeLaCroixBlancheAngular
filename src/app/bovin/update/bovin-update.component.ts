import {Component, OnInit} from '@angular/core';
import {Bovin} from "../../models/bovin/bovin";
import {map, Observable, startWith} from "rxjs";
import {A} from "../../models/sante/a";
import {FormControl, FormGroup} from "@angular/forms";
import {BovinService} from "../../service/bovin.service";
import {SanteService} from "../../service/sante.service";
import {Race} from "../../models/bovin/race";
import {RaceService} from "../../service/race.service";
import {BovinEngraissement} from "../../models/bovin/bovinEngraissement";
import {Champ} from "../../models/champ/champ";
import {Melange} from "../../models/bovin/melange";
import {MelangeService} from "../../service/melange.service";
import {ChampService} from "../../service/champ.service";
import {FemelleReproduction} from "../../models/bovin/femelleReproduction";

@Component({
  selector: 'app-bovin-update',
  templateUrl: './bovin-update.component.html',
  styleUrls: ['./bovin-update.component.css']
})
export class BovinUpdateComponent implements OnInit{

  loading: boolean = false
  bovin!: Bovin;
  bovins!: string[];
  champs!: Champ[];
  melanges!: Melange[];
  filteredOptions!: Observable<string[]>;
  aCommeMaladie!: A[];
  races!: Race[];
  femelleReproduction!: FemelleReproduction;
  bovinEngraissement!: BovinEngraissement;

  myControl = new FormControl('BE');

  formInformations!: FormGroup;
  formFinalite!: FormGroup;

  constructor(private readonly _bovinService: BovinService,
              private readonly _raceService: RaceService,
              private readonly _melangeService: MelangeService,
              private readonly _champService: ChampService,
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
      champId: new FormControl(''),

      dateDerniereInsemination: new FormControl(''),
      perteGrossesse: new FormControl(''),

      dateEngraissement: new FormControl(''),
      melangeId: new FormControl(''),
      poidsSurPattes: new FormControl(''),
      poidsCarcasse: new FormControl(''),
    })
    this.formFinalite = new FormGroup({
      finalite: new FormControl(''),
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

    this._raceService.getAllRace().subscribe(
      (race)=>
    this.races=race
    )

    this._melangeService.getAllMelange().subscribe(
      (melange)=>
        this.melanges=melange
    )

    this._champService.getAll().subscribe(
      (champ)=>
        this.champs=champ
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

      this._santeService.getA(this.bovin.id).subscribe(
        (a) =>
          this.aCommeMaladie = a);

      this._bovinService.getInfosReproduction(this.bovin.id).subscribe(
        (f) =>{
          this.femelleReproduction = f;
        }
      );

      this._bovinService.getInfosEngraissement(this.bovin.id).subscribe(
        (b) =>{
          this.bovinEngraissement = b;
        }
      );

      this.loading=false;

      this.setFormInformation();
      this.setFormInformationComp();

    })
  }

  setFormInformation(){
    if(this.femelleReproduction){
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
        champId: new FormControl(this.bovin.champ.id),
        enCharge: new FormControl(this.bovin.enCharge),

        dateDerniereInsemination: new FormControl(this.femelleReproduction.derniereInsemination),
        perteGrossesse: new FormControl(this.femelleReproduction.perteGrossesse),
      })
    } else if(this.bovinEngraissement){
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
        champId: new FormControl(this.bovin.champ.id),
        enCharge: new FormControl(this.bovin.enCharge),

        dateEngraissement: new FormControl(this.bovinEngraissement.dateEngraissement),
        melangeId: new FormControl(this.bovinEngraissement.melange.id),
        poidsSurPattes: new FormControl(this.bovinEngraissement.poidsSurPattes),
        poidsCarcasse: new FormControl(this.bovinEngraissement.poidsCarcasse),
      })
    } else {

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
        champId: new FormControl(this.bovin.champ.id),
        enCharge: new FormControl(this.bovin.enCharge),
      })
    }
  }

  setFormInformationComp(){
    this.formFinalite = new FormGroup({
      finalite: new FormControl(''),
    })
  }

  UpdateBovin(){

      this._bovinService.update(this.bovin.id, this.formInformations.value).subscribe()
    }

}

