import {Component, OnInit} from '@angular/core';
import {Race} from "../../models/bovin/race";
import {RaceService} from "../../service/race.service";
import {FormControl, FormGroup} from "@angular/forms";
import {SanteService} from "../../service/sante.service";
import {Maladie} from "../../models/sante/maladie";
import {Traitement} from "../../models/sante/traitement";

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

  constructor(private readonly _raceService: RaceService,
              private readonly _santeService: SanteService) {
    this._formRaceId= new FormGroup({
      raceId: new FormControl('')
    })
    this._formRaceId.get('raceId')?.valueChanges.subscribe((v) => {
      this._raceService.getOne(v).subscribe({
        next: (race) => {
          this._race = race;
          this._formRace = new FormGroup({
            nom: new FormControl(this._race.nom)
          })
        }})
    })
    this._formRace = new FormGroup({
      nom: new FormControl()
    })

    this._formMaladieId= new FormGroup({
      maladieId: new FormControl('')
    })
    this._formMaladieId.get('maladieId')?.valueChanges.subscribe((v) => {
      this._santeService.getMaladie(v).subscribe({
        next: (maladie) => {
          this._maladie = maladie;
          this._formMaladie = new FormGroup({
            nom: new FormControl(this._maladie.nom)
          })
        }})
    })
    this._formMaladie = new FormGroup({
      nom: new FormControl()
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
      nomTraitement: new FormControl(''),
      actif: new FormControl(''),
    })
    this._formTraitement = new FormGroup({
      nomTraitement: new FormControl(''),
      actif: new FormControl(''),
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
}
