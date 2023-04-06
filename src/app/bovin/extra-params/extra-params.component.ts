import {Component, OnInit} from '@angular/core';
import {Race} from "../../models/bovin/race";
import {RaceService} from "../../service/race.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SanteService} from "../../service/sante.service";
import {Maladie} from "../../models/sante/maladie";
import {Traitement} from "../../models/sante/traitement";
import {MelangeService} from "../../service/melange.service";
import {Melange} from "../../models/bovin/melange";

@Component({
  selector: 'app-extra-params',
  templateUrl: './extra-params.component.html',
  styleUrls: ['./extra-params.component.scss']
})
export class ExtraParamsComponent implements OnInit{

  private _races!: Race[];
  private _race!: Race;
  private _nomRace: string ="";

  private _formRaceId: FormGroup;
  private _formRace: FormGroup;

  private _maladies!: Maladie[];
  private _maladie!: Maladie;
  private _nomMaladie: string ="";

  private _formMaladieId: FormGroup;
  private _formMaladie: FormGroup;

  private _traitements!: Traitement[];
  private _traitement!: Traitement;

  private _formTraitementId: FormGroup;
  private _formTraitementUpdate: FormGroup;
  private readonly _formTraitement: FormGroup;

  private _melanges!: Melange[];
  private _melange!: Melange;

  private _formMelangeId: FormGroup;
  private _formMelangeUpdate: FormGroup;
  private readonly _formMelange: FormGroup;

  constructor(private readonly _raceService: RaceService,
              private readonly _santeService: SanteService,
              private readonly _melangeService: MelangeService) {
    this._formRaceId= new FormGroup({
      raceId: new FormControl('')
    })
    this._formRaceId.get('raceId')?.valueChanges.subscribe((v) => {
      this._raceService.getOne(v).subscribe({
        next: (race) => {
          this._race = race;
          this._formRace = new FormGroup({
            nom: new FormControl(this._race.nom, Validators.required)
          })
        }})
    })
    this._formRace = new FormGroup({
      nom: new FormControl('',Validators.required)
    })

    this._formMaladieId= new FormGroup({
      maladieId: new FormControl('')
    })
    this._formMaladieId.get('maladieId')?.valueChanges.subscribe((v) => {
      this._santeService.getMaladie(v).subscribe({
        next: (maladie) => {
          this._maladie = maladie;
          this._formMaladie = new FormGroup({
            nom: new FormControl(this._maladie.nom,Validators.required)
          })
        }})
    })
    this._formMaladie = new FormGroup({
      nom: new FormControl('',Validators.required)
    })


    this._formTraitementId= new FormGroup({
      traitementId: new FormControl('')
    })
    this._formTraitementId.get('traitementId')?.valueChanges.subscribe((v) => {
      this._santeService.getTraitement(v).subscribe({
        next: (traitement) => {
          this._traitement = traitement;
          this._formTraitementUpdate = new FormGroup({
            nomTraitement: new FormControl(this._traitement.nomTraitement),
            actif: new FormControl(this._traitement.actif),
          });
        }})
    })
    this._formTraitementUpdate = new FormGroup({
      nomTraitement: new FormControl('',Validators.required),
      actif: new FormControl('',Validators.required),
    })
    this._formTraitement = new FormGroup({
      nomTraitement: new FormControl('',Validators.required),
      actif: new FormControl('',Validators.required),
    })

    this._formMelangeId= new FormGroup({
      melangeId: new FormControl('')
    })
    this._formMelangeId.get('melangeId')?.valueChanges.subscribe((v) => {
      this._melangeService.getMelange(v).subscribe({
        next: (melange) => {
          this._melange = melange
          this._formMelangeUpdate = new FormGroup({
            nomMelange: new FormControl(this._melange.nomMelange,Validators.required),
            description: new FormControl(this._melange.description,Validators.required),
          });
        }})
    })
    this._formMelangeUpdate = new FormGroup({
      nomMelange: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
    })
    this._formMelange = new FormGroup({
      nomMelange: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
    })
  }
  ngOnInit(): void {
    this._raceService.getAllRace().subscribe(value => {
      this._races = value;
    })
    this._santeService.getAllMaladie().subscribe(value => {
      this._maladies = value;
    })
    this._santeService.getAllTraitement().subscribe(value => {
      this._traitements = value;
    })
    this._melangeService.getAllMelange().subscribe(value => {
      this._melanges = value;
    })
  }

  //Race

  refreshRace(){
    this._raceService.getAllRace().subscribe(value => {
      this._races = value;
    })
  }

  enregistrerModifRace(){
    this._raceService.update(this._race.id, this._formRace.value).subscribe((response: any) => {
      this.refreshRace();
    });
  }

  enregistrerRace(){
    this._raceService.add(this._nomRace).subscribe((response: any) => {
      this.refreshRace();
    });
  }

  //Maladie

  refreshMaladie(){
    this._santeService.getAllMaladie().subscribe(value => {
      this._maladies = value;
    })
  }

  enregistrerModifMaladie(){
    this._santeService.updateMaladie(this._maladie.id, this._formMaladie.value).subscribe((response: any) => {
      this.refreshMaladie();
    });
  }

  enregistrerMaladie(){
    this._santeService.insertMaladie(this._nomMaladie).subscribe((response: any) => {
      this.refreshMaladie();
    });
  }

  //Traitement

  refreshTraitement(){
    this._santeService.getAllTraitement().subscribe(value => {
      this._traitements = value;
    })
  }

  enregistrerModifTraitement(){
    this._santeService.updateTraitement(this._traitement.id, this._formTraitementUpdate.value).subscribe((response: any) => {
      this.refreshTraitement();
    });
  }

  enregistrerTraitement(){
    this._santeService.insertTraitement(this._formTraitement.value).subscribe((response: any) => {
      this.refreshTraitement();
    });
  }

  //Mélanges

  refreshMelange(){
    this._melangeService.getAllMelange().subscribe(value => {
      this._melanges = value;
    })
  }

  enregistrerModifMelange(){
    this._melangeService.updateMelange(this._melange.id, this._formMelangeUpdate.value).subscribe((response: any) => {
      this.refreshMelange();
    });
  }

  enregistrerMelange(){
    this._melangeService.insertMelange(this._formMelange.value).subscribe((response: any) => {
      this.refreshMelange();
    });
  }


  //Getters et setters

  get nomRace(): string {
    return this._nomRace;
  }

  set nomRace(value: string) {
    if(value!="")
      this._nomRace = value;
  }

  get races(): Race[] {
    return this._races;
  }

  get race(): Race {
    return this._race;
  }

  get formRace(): FormGroup {
    return this._formRace;
  }

  get formRaceId(): FormGroup {
    return this._formRaceId;
  }

  get maladies(): Maladie[] {
    return this._maladies;
  }

  get nomMaladie(): string {
    return this._nomMaladie;
  }

  set nomMaladie(value: string) {
    this._nomMaladie = value;
  }

  get formMaladieId(): FormGroup {
    return this._formMaladieId;
  }

  get formMaladie(): FormGroup {
    return this._formMaladie;
  }

  get traitements(): Traitement[] {
    return this._traitements;
  }

  get formTraitementId(): FormGroup {
    return this._formTraitementId;
  }

  get formTraitementUpdate(): FormGroup {
    return this._formTraitementUpdate;
  }

  get formTraitement(): FormGroup {
    return this._formTraitement;
  }

  get formMelange(): FormGroup {
    return this._formMelange;
  }

  get melanges(): Melange[] {
    return this._melanges;
  }

  get formMelangeId(): FormGroup {
    return this._formMelangeId;
  }

  get formMelangeUpdate(): FormGroup {
    return this._formMelangeUpdate;
  }
}
