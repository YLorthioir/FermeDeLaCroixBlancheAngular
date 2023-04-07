import {Component, OnInit} from '@angular/core';
import {Bovin} from "../../../models/bovin/bovin";
import {Champ} from "../../../models/champ/champ";
import {Melange} from "../../../models/bovin/melange";
import {debounceTime, map, Observable, startWith} from "rxjs";
import {A} from "../../../models/sante/a";
import {Race} from "../../../models/bovin/race";
import {FemelleReproduction} from "../../../models/bovin/femelleReproduction";
import {BovinEngraissement} from "../../../models/bovin/bovinEngraissement";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BovinService} from "../../../service/bovin.service";
import {RaceService} from "../../../service/race.service";
import {MelangeService} from "../../../service/melange.service";
import {ChampService} from "../../../service/champ.service";
import {SanteService} from "../../../service/sante.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-bovin-update-selected',
  templateUrl: './bovin-update-selected.component.html',
  styleUrls: ['./bovin-update-selected.component.scss']
})
export class BovinUpdateSelectedComponent implements OnInit{

  private _loading: boolean = false
  private _bovin!: Bovin;
  private _bovins!: string[];
  private _champs!: Champ[];
  private _melanges!: Melange[];
  private _filteredOptions!: Observable<string[]>;
  private _aCommeMaladie!: A[];
  private _races!: Race[];
  private _femelleReproduction?: FemelleReproduction;
  private _bovinEngraissement?: BovinEngraissement;

  private _myControl = new FormControl('BE');

  private _formInformations!: FormGroup;
  private _formFinalite!: FormGroup;

  constructor(private readonly _bovinService: BovinService,
              private readonly _raceService: RaceService,
              private readonly _melangeService: MelangeService,
              private readonly _champService: ChampService,
              private readonly _santeService: SanteService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute
              ) {
    this._formInformations = new FormGroup({
      numeroInscription: new FormControl('',[Validators.required, Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
      nom: new FormControl(''),
      raceId: new FormControl('',[Validators.required]),
      sexe: new FormControl('',[Validators.required, Validators.pattern('M'||'F')]),
      pereNI: new FormControl(''),
      mereNI: new FormControl('',[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
      dateDeNaissance: new FormControl('',[Validators.required]),
      poidsNaissance: new FormControl('',[Validators.min(0)]),
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
    this._formFinalite = new FormGroup({
      finalite: new FormControl(''),
    })

    this.getBovin(this._route.snapshot.params['param']);
  }

  ngOnInit(): void {
    this._raceService.getAllRace().subscribe(
      (races)=> {
        this._races = races;
      }
    )

    this._bovinService.getAllNI().subscribe(
      (bovins) => {
        this._bovins = bovins;
        this._filteredOptions = this._myControl.valueChanges.pipe(
          debounceTime(500),
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    )

    this._raceService.getAllRace().subscribe(
      (race)=>
        this._races=race
    )

    this._melangeService.getAllMelange().subscribe(
      (melange)=>
        this._melanges=melange
    )

    this._champService.getAll().subscribe(
      (champ)=>
        this._champs=champ
    )
  }

  private _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this._bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  getBovin(numeroIdentification: string){
    this._loading=true;

    this._bovinService.getOne(numeroIdentification).subscribe((bovin) => {
      this._bovin = bovin

      this._santeService.getA(this._bovin.id).subscribe(
        (a) => {
          this._aCommeMaladie = a

          this._bovinService.getInfosReproduction(this._bovin.id).subscribe(
            (f) =>{
              this._femelleReproduction = f;

              this._bovinService.getInfosEngraissement(this._bovin.id).subscribe(
                (b) =>{
                  this._bovinEngraissement = b;

                  this._loading=false;

                  this.setFormInformation();
                  this.setFormInformationComp();
                }
              );
            }
          );
        })
    })
  }

  setFormInformation(){
    if(this._femelleReproduction){
      this._formInformations = new FormGroup({
        numeroInscription: new FormControl(this._bovin.numeroInscription,[Validators.required, Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        nom: new FormControl(this._bovin.nom),
        raceId: new FormControl(this._bovin.race.id,[Validators.required]),
        sexe: new FormControl(this._bovin.sexe,[Validators.required, Validators.pattern('M'||'F')]),
        pereNI: new FormControl(this._bovin.pereNI),
        mereNI: new FormControl(this._bovin.mereNI,[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        dateDeNaissance: new FormControl(this._bovin.dateDeNaissance,[Validators.required]),
        poidsNaissance: new FormControl(this._bovin.poidsNaissance,[Validators.min(0)]),
        neCesarienne: new FormControl(this._bovin.neCesarienne),
        champId: new FormControl(this._bovin.champ?this._bovin.champ.id:undefined),
        enCharge: new FormControl(this._bovin.enCharge),

        dateDerniereInsemination: new FormControl(this._femelleReproduction.derniereInsemination),
        perteGrossesse: new FormControl(this._femelleReproduction.perteGrossesse),
      });
    } else if(this._bovinEngraissement){
      this._formInformations = new FormGroup({
        numeroInscription: new FormControl(this._bovin.numeroInscription,[Validators.required, Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        nom: new FormControl(this._bovin.nom),
        raceId: new FormControl(this._bovin.race.id,[Validators.required]),
        sexe: new FormControl(this._bovin.sexe,[Validators.required, Validators.pattern('M'||'F')]),
        pereNI: new FormControl(this._bovin.pereNI),
        mereNI: new FormControl(this._bovin.mereNI,[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        dateDeNaissance: new FormControl(this._bovin.dateDeNaissance,[Validators.required]),
        poidsNaissance: new FormControl(this._bovin.poidsNaissance,[Validators.min(0)]),
        neCesarienne: new FormControl(this._bovin.neCesarienne),
        champId: new FormControl(this._bovin.champ?this._bovin.champ.id:undefined),
        enCharge: new FormControl(this._bovin.enCharge),

        dateEngraissement: new FormControl(this._bovinEngraissement.dateEngraissement),
        melangeId: new FormControl(this._bovinEngraissement.melange.id),
        poidsSurPattes: new FormControl(this._bovinEngraissement.poidsSurPattes),
        poidsCarcasse: new FormControl(this._bovinEngraissement.poidsCarcasse),
      })
      this._formFinalite = new FormGroup({
        finalite: new FormControl('BovinEngraissement'),
      })
    } else {

      this._formInformations = new FormGroup({
        numeroInscription: new FormControl(this._bovin.numeroInscription,[Validators.required, Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        nom: new FormControl(this._bovin.nom),
        raceId: new FormControl(this._bovin.race.id,[Validators.required]),
        sexe: new FormControl(this._bovin.sexe,[Validators.required, Validators.pattern('M'||'F')]),
        pereNI: new FormControl(this._bovin.pereNI),
        mereNI: new FormControl(this._bovin.mereNI,[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        dateDeNaissance: new FormControl(this._bovin.dateDeNaissance,[Validators.required]),
        poidsNaissance: new FormControl(this._bovin.poidsNaissance,[Validators.min(0)]),
        neCesarienne: new FormControl(this._bovin.neCesarienne),
        champId: new FormControl(this._bovin.champ?this._bovin.champ.id:undefined),
        enCharge: new FormControl(this._bovin.enCharge),
      })
      this._formFinalite = new FormGroup({
        finalite: new FormControl('Bovin'),
      })
    }
  }

  setFormInformationComp(){
    if(this._femelleReproduction) {
      this._formFinalite = new FormGroup({
        finalite: new FormControl('FemelleReproduction'),
      })
    } else if(this._bovinEngraissement) {
      this._formFinalite = new FormGroup({
        finalite: new FormControl('BovinEngraissement'),
      })
    } else {
      this._formFinalite = new FormGroup({
        finalite: new FormControl('Bovin'),
      })
    }
  }

  OnBovinSelected(option: string){

    this._router.navigateByUrl('bovin/update/'+option);
    this.getBovin(option);

  }

  UpdateBovin(){
    this._bovinService.update(this._bovin.id, this._formInformations.value).subscribe()
  }

  UpdateType(){
    this._bovinService.updateType(this._bovin.id, this._formFinalite.value).subscribe()
  }

  //Encapsulation


  get loading(): boolean {
    return this._loading;
  }

  get bovin(): Bovin {
    return this._bovin;
  }

  get champs(): Champ[] {
    return this._champs;
  }

  get melanges(): Melange[] {
    return this._melanges;
  }

  get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }

  get aCommeMaladie(): A[] {
    return this._aCommeMaladie;
  }

  get races(): Race[] {
    return this._races;
  }

  get femelleReproduction(): FemelleReproduction | undefined {
    return this._femelleReproduction;
  }

  get bovinEngraissement(): BovinEngraissement | undefined {
    return this._bovinEngraissement;
  }

  get myControl(): FormControl<string | null> {
    return this._myControl;
  }

  get formInformations(): FormGroup {
    return this._formInformations;
  }

  get formFinalite(): FormGroup {
    return this._formFinalite;
  }
}


