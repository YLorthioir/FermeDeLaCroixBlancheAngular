import {Component, OnDestroy, OnInit} from '@angular/core';
import {Race} from "../../models/bovin/race";
import {RaceService} from "../../service/race.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SanteService} from "../../service/sante.service";
import {Maladie} from "../../models/sante/maladie";
import {Traitement} from "../../models/sante/traitement";
import {MelangeService} from "../../service/melange.service";
import {Melange} from "../../models/bovin/melange";
import {Observable, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-extra-params',
  templateUrl: './extra-params.component.html',
  styleUrls: ['./extra-params.component.scss']
})
export class ExtraParamsComponent implements OnInit, OnDestroy{

  public races$: Observable<Race[]> = new Observable<Race[]>;
  public race!: Race;
  public nomRace: string ="";

  public formRaceId: FormGroup;
  public formRace: FormGroup;

  public maladies$: Observable<Maladie[]> = new Observable<Maladie[]>;
  public maladie!: Maladie;
  public nomMaladie: string ="";

  public formMaladieId: FormGroup;
  public formMaladie: FormGroup;

  public traitements$: Observable<Traitement[]> = new Observable<Traitement[]>;
  public traitement!: Traitement;

  public formTraitementId: FormGroup;
  public formTraitementUpdate: FormGroup;
  public formTraitement: FormGroup;

  public melanges$: Observable<Melange[]> = new Observable<Melange[]>;
  public melange!: Melange;

  public formMelangeId: FormGroup;
  public formMelangeUpdate: FormGroup;
  public formMelange: FormGroup;

  private destroyed$ = new Subject();

  constructor(private readonly raceService: RaceService,
              private readonly santeService: SanteService,
              private readonly melangeService: MelangeService) {
    this.formRaceId= new FormGroup({
      raceId: new FormControl('')
    })
    this.formRaceId.get('raceId')?.valueChanges.subscribe((v) => {
      this.raceService.getOne(v).subscribe({
        next: (race) => {
          this.race = race;
          this.formRace = new FormGroup({
            nom: new FormControl(this.race.nom, Validators.required)
          })
        }})
    })
    this.formRace = new FormGroup({
      nom: new FormControl('',Validators.required)
    })

    this.formMaladieId= new FormGroup({
      maladieId: new FormControl('')
    })
    this.formMaladieId.get('maladieId')?.valueChanges.subscribe((v) => {
      this.santeService.getMaladie(v).subscribe({
        next: (maladie) => {
          this.maladie = maladie;
          this.formMaladie = new FormGroup({
            nom: new FormControl(this.maladie.nom,Validators.required)
          })
        }})
    })
    this.formMaladie = new FormGroup({
      nom: new FormControl('',Validators.required)
    })


    this.formTraitementId= new FormGroup({
      traitementId: new FormControl('')
    })
    this.formTraitementId.get('traitementId')?.valueChanges.subscribe((v) => {
      this.santeService.getTraitement(v).subscribe({
        next: (traitement) => {
          this.traitement = traitement;
          this.formTraitementUpdate = new FormGroup({
            nomTraitement: new FormControl(this.traitement.nomTraitement),
            actif: new FormControl(this.traitement.actif),
          });
        }})
    })
    this.formTraitementUpdate = new FormGroup({
      nomTraitement: new FormControl('',Validators.required),
      actif: new FormControl('',Validators.required),
    })
    this.formTraitement = new FormGroup({
      nomTraitement: new FormControl('',Validators.required),
      actif: new FormControl(false,Validators.required),
    })

    this.formMelangeId= new FormGroup({
      melangeId: new FormControl('')
    })
    this.formMelangeId.get('melangeId')?.valueChanges.subscribe((v) => {
      this.melangeService.getMelange(v).subscribe({
        next: (melange) => {
          this.melange = melange
          this.formMelangeUpdate = new FormGroup({
            nomMelange: new FormControl(this.melange.nomMelange,Validators.required),
            description: new FormControl(this.melange.description,Validators.required),
          });
        }})
    })
    this.formMelangeUpdate = new FormGroup({
      nomMelange: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
    })
    this.formMelange = new FormGroup({
      nomMelange: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
    })
  }

  ngOnInit(): void {

    this.loadRace();
    this.loadMaladie();
    this.loadTraitement();
    this.loadMelange()
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }


//Race

  loadRace(){
    this.races$=this.raceService.getAllRace();
  }

  enregistrerModifRace(){
    this.raceService.update(this.race.id, this.formRace.value).pipe(
      takeUntil(this.destroyed$),
      tap(()=>{
        this.loadRace()
      })
    ).subscribe({
      next: ()=>{},
      error: (err)=> {
        if(err.error.status === 'BAD_REQUEST')
          alert(err.error.message)
        else
          alert(err.error.error)
      }
    })
  }

  enregistrerRace(){
    this.raceService.add(this.nomRace).pipe(
      takeUntil(this.destroyed$),
      tap(()=>{
        this.loadRace()
      })
    ).subscribe({
      next: ()=>{},
      error: (err)=> {
        if(err.error.status === 'BAD_REQUEST')
          alert(err.error.message)
        else
          alert(err.error.error)
      }
    })
  }

  //Maladie

  loadMaladie(){
    this.maladies$=this.santeService.getAllMaladie();
  }

  enregistrerModifMaladie() {
    this.santeService.updateMaladie(this.maladie.id, this.formMaladie.value).pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.loadMaladie()
      })
    ).subscribe({
      next: ()=>{},
      error: (err)=> {
        if(err.error.status === 'BAD_REQUEST')
          alert(err.error.message)
        else
          alert(err.error.error)
      }
    })
  }

  enregistrerMaladie(){
    this.santeService.insertMaladie(this.nomMaladie).pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.loadMaladie()
      })
    ).subscribe({
      next: ()=>{},
      error: (err)=> {
        if(err.error.status === 'BAD_REQUEST')
          alert(err.error.message)
        else
          alert(err.error.error)
      }
    })
  }

  //Traitement

  loadTraitement(){
    this.traitements$ = this.santeService.getAllTraitement()
  }

  enregistrerModifTraitement(){
    this.santeService.updateTraitement(this.traitement.id, this.formTraitementUpdate.value).pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.loadTraitement()
      })
    ).subscribe({
      next: ()=>{},
      error: (err)=> {
        if(err.error.status === 'BAD_REQUEST')
          alert(err.error.message)
        else
          alert(err.error.error)
      }
    })
  }

  enregistrerTraitement(){
    this.santeService.insertTraitement(this.formTraitement.value).pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.loadTraitement()
      })
    ).subscribe({
      next: ()=>{},
      error: (err)=> {
        if(err.error.status === 'BAD_REQUEST')
          alert(err.error.message)
        else
          alert(err.error.error)
      }
    })
  }

  //Mélanges

  loadMelange(){
    this.melanges$ = this.melangeService.getAllMelange();
  }

  enregistrerModifMelange(){
    this.melangeService.updateMelange(this.melange.id, this.formMelangeUpdate.value).pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.loadMelange()
      })
    ).subscribe({
      next: ()=>{},
      error: (err)=> {
        if(err.error.status === 'BAD_REQUEST')
          alert(err.error.message)
        else
          alert(err.error.error)
      }
    })
  }

  enregistrerMelange(){
    this.melangeService.insertMelange(this.formMelange.value).pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.loadMelange()
      })
    ).subscribe({
      next: ()=>{},
      error: (err)=> {
        if(err.error.status === 'BAD_REQUEST')
          alert(err.error.message)
        else
          alert(err.error.error)
      }
    })
  }
}
