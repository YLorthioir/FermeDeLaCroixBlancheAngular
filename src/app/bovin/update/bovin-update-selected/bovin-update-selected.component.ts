import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bovin} from "../../../models/bovin/bovin";
import {Champ} from "../../../models/champ/champ";
import {Melange} from "../../../models/bovin/melange";
import {debounceTime, map, Observable, startWith, Subject} from "rxjs";
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
import {inThePast} from "../../../validators/TimeValidators";

@Component({
  selector: 'app-bovin-update-selected',
  templateUrl: './bovin-update-selected.component.html',
  styleUrls: ['./bovin-update-selected.component.scss']
})
export class BovinUpdateSelectedComponent implements OnInit, OnDestroy{

  public loading: boolean = false
  public bovin!: Bovin;
  public bovins!: string[];
  public champs!: Champ[];
  public melanges!: Melange[];
  public filteredOptions!: Observable<string[]>;
  public aCommeMaladie!: A[];
  public races!: Race[];
  public femelleReproduction?: FemelleReproduction;
  public bovinEngraissement?: BovinEngraissement;
  public taureaux!: Bovin[];

  public myControl = new FormControl('BE');

  public formInformations!: FormGroup;
  public formFinalite!: FormGroup;

  private destroyed$ = new Subject();

  constructor(private readonly _bovinService: BovinService,
              private readonly _raceService: RaceService,
              private readonly _melangeService: MelangeService,
              private readonly _champService: ChampService,
              private readonly _santeService: SanteService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute
              ) {
    this.formInformations = new FormGroup({
      numeroInscription: new FormControl('',[Validators.required, Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
      nom: new FormControl(''),
      raceId: new FormControl('',[Validators.required]),
      sexe: new FormControl('',[Validators.required]),
      pereNI: new FormControl('',[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
      mereNI: new FormControl('',[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
      dateDeNaissance: new FormControl('',[Validators.required, inThePast()]),
      poidsNaissance: new FormControl('',[Validators.min(0),Validators.pattern(/[0-9]+$/)]),
      neCesarienne: new FormControl(''),
      enCharge: new FormControl(''),
      champId: new FormControl(''),
      dateAbattage: new FormControl('', inThePast()),
      raisonAbattage: new FormControl(''),

      dateDerniereInsemination: new FormControl('', inThePast()),
      perteGrossesse: new FormControl('',Validators.pattern(/[0-9]+$/)),

      dateEngraissement: new FormControl('', inThePast()),
      melangeId: new FormControl(''),
      poidsSurPattes: new FormControl('',Validators.pattern(/[0-9]+$/)),
      poidsCarcasse: new FormControl('',Validators.pattern(/[0-9]+$/)),
    })
    this.formFinalite = new FormGroup({
      finalite: new FormControl(''),
    })

    this.getBovin(this._route.snapshot.params['param']);
  }

  ngOnInit(): void {
    this._raceService.getAllRace().subscribe(
      (races)=> {
        this.races = races;
      }
    )

    this._bovinService.getAllTaureaux().subscribe(
      (t)=>{
        this.taureaux=t;
      }
    )


    this._bovinService.getAllNI().subscribe(
      (bovins) => {
        this.bovins = bovins;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          debounceTime(500),
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

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  public _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this.bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  getBovin(numeroIdentification: string){
    this.loading=true;

    this._bovinService.getOne(numeroIdentification).subscribe((bovin) => {
      this.bovin = bovin

      this._santeService.getA(this.bovin.id).subscribe(
        (a) => {
          this.aCommeMaladie = a

          this._bovinService.getInfosReproduction(this.bovin.id).subscribe(
            (f) =>{
              this.femelleReproduction = f;

              this._bovinService.getInfosEngraissement(this.bovin.id).subscribe(
                (b) =>{
                  this.bovinEngraissement = b;

                  this.loading=false;

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
    if(this.femelleReproduction){
      this.formInformations = new FormGroup({
        numeroInscription: new FormControl(this.bovin.numeroInscription,[Validators.required, Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        nom: new FormControl(this.bovin.nom),
        raceId: new FormControl(this.bovin.race.id,[Validators.required]),
        sexe: new FormControl(this.bovin.sexe,[Validators.required]),
        pereNI: new FormControl(this.bovin.pereNI,[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        mereNI: new FormControl(this.bovin.mereNI,[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        dateDeNaissance: new FormControl(this.bovin.dateDeNaissance,[Validators.required, inThePast()]),
        poidsNaissance: new FormControl(this.bovin.poidsNaissance,[Validators.min(0),Validators.pattern(/[0-9]+$/)]),
        neCesarienne: new FormControl(this.bovin.neCesarienne),
        champId: new FormControl(this.bovin.champ?this.bovin.champ.id:undefined),
        enCharge: new FormControl(this.bovin.enCharge),
        dateAbattage: new FormControl(this.bovin.dateAbattage, inThePast()),
        raisonAbattage: new FormControl(this.bovin.raisonAbattage),

        dateDerniereInsemination: new FormControl(this.femelleReproduction.derniereInsemination, inThePast()),
        perteGrossesse: new FormControl(this.femelleReproduction.perteGrossesse),
      });
    } else if(this.bovinEngraissement){
      this.formInformations = new FormGroup({
        numeroInscription: new FormControl(this.bovin.numeroInscription,[Validators.required, Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        nom: new FormControl(this.bovin.nom),
        raceId: new FormControl(this.bovin.race.id,[Validators.required]),
        sexe: new FormControl(this.bovin.sexe,[Validators.required]),
        pereNI: new FormControl(this.bovin.pereNI,[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        mereNI: new FormControl(this.bovin.mereNI,[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        dateDeNaissance: new FormControl(this.bovin.dateDeNaissance,[Validators.required, inThePast()]),
        poidsNaissance: new FormControl(this.bovin.poidsNaissance,[Validators.min(0),Validators.pattern(/[0-9]+$/)]),
        neCesarienne: new FormControl(this.bovin.neCesarienne),
        champId: new FormControl(this.bovin.champ?this.bovin.champ.id:undefined),
        enCharge: new FormControl(this.bovin.enCharge),
        dateAbattage: new FormControl(this.bovin.dateAbattage, inThePast()),
        raisonAbattage: new FormControl(this.bovin.raisonAbattage),

        dateEngraissement: new FormControl(this.bovinEngraissement.dateEngraissement, inThePast()),
        melangeId: new FormControl(this.bovinEngraissement.melange.id),
        poidsSurPattes: new FormControl(this.bovinEngraissement.poidsSurPattes,Validators.pattern(/[0-9]+$/)),
        poidsCarcasse: new FormControl(this.bovinEngraissement.poidsCarcasse,Validators.pattern(/[0-9]+$/)),
      })
      this.formFinalite = new FormGroup({
        finalite: new FormControl('BovinEngraissement'),
      })
    } else {

      this.formInformations = new FormGroup({
        numeroInscription: new FormControl(this.bovin.numeroInscription,[Validators.required, Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        nom: new FormControl(this.bovin.nom),
        raceId: new FormControl(this.bovin.race.id,[Validators.required]),
        sexe: new FormControl(this.bovin.sexe,[Validators.required]),
        pereNI: new FormControl(this.bovin.pereNI,[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        mereNI: new FormControl(this.bovin.mereNI,[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]),
        dateDeNaissance: new FormControl(this.bovin.dateDeNaissance,[Validators.required, inThePast()]),
        poidsNaissance: new FormControl(this.bovin.poidsNaissance,[Validators.min(0),Validators.pattern(/[0-9]+$/)]),
        neCesarienne: new FormControl(this.bovin.neCesarienne),
        champId: new FormControl(this.bovin.champ?this.bovin.champ.id:null),
        enCharge: new FormControl(this.bovin.enCharge),
        dateAbattage: new FormControl(this.bovin.dateAbattage, inThePast()),
        raisonAbattage: new FormControl(this.bovin.raisonAbattage),
      })
      this.formFinalite = new FormGroup({
        finalite: new FormControl('Bovin'),
      })
    }
  }

  setFormInformationComp(){
    if(this.femelleReproduction) {
      this.formFinalite = new FormGroup({
        finalite: new FormControl('FemelleReproduction'),
      })
    } else if(this.bovinEngraissement) {
      this.formFinalite = new FormGroup({
        finalite: new FormControl('BovinEngraissement'),
      })
    } else {
      this.formFinalite = new FormGroup({
        finalite: new FormControl('Bovin'),
      })
    }
  }

  OnBovinSelected(option: string){

    this._router.navigateByUrl('bovin/update/'+option);
    this.getBovin(option);

  }

  UpdateBovin(){
    this._bovinService.update(this.bovin.id, this.formInformations.value).subscribe({
      next: ()=>this._router.navigateByUrl('bovin/one/'+this.bovin.numeroInscription),
      error: (err)=> {
        if(err.error.status === 'BAD_REQUEST')
          alert("Numéro d'identification déjà existant")
        else if(err.error.error === 'Bad Request')
          alert("Formulaire invalide")
      }
      }
    )
  }

  UpdateType(){
    this._bovinService.updateType(this.bovin.id, this.formFinalite.value).subscribe()
  }
}



