import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Champ} from "../../models/champ/champ";
import {Grain} from "../../models/champ/grain";
import {ChampService} from "../../service/champ.service";
import {GrainService} from "../../service/grain.service";
import {ActivatedRoute} from "@angular/router";
import {Culture} from "../../models/champ/culture";

@Component({
  selector: 'app-update-culture',
  templateUrl: './update-culture.component.html',
  styleUrls: ['./update-culture.component.scss']
})
export class UpdateCultureComponent implements OnInit{

  private _formCulture: FormGroup;

  private _loading: boolean = false;

  private _champs!: Champ[];
  private _grains!: Grain[];
  private _culture!: Culture;

  constructor(private readonly _champService: ChampService,
              private readonly _grainService: GrainService,
              private readonly _route: ActivatedRoute,
  ) {
    this._formCulture = new FormGroup({
      idChamp: new FormControl('',Validators.required),
      temporaire: new FormControl(false,Validators.required),
      dateMiseEnCulture: new FormControl('', Validators.required),
      dateDeFin: new FormControl(''),
      dateDernierEpandage: new FormControl(''),
      qttFumier: new FormControl(''),
      referenceAnalyse: new FormControl(''),
      grainId: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this._loading=true;
    this._champService.getAll().subscribe(
      champs =>{
        this._champs = champs;
        this._grainService.getAll().subscribe(
          grains=>{
            this._grains = grains;
            this.getCulture(this._route.snapshot.params['param']);
            this._loading = false;

          }
        )
      }
    )
  }

  onSubmit(){
    if(this._formCulture.valid)
      this._champService.updateCulture(this._culture.id, this._formCulture.value).subscribe();
  }

  getCulture(id: number){
    this._champService.getOneCulture(id).subscribe(
      culture => {
        this._culture=culture;
        this.refresh();
      }
    )
  }

  refresh(){
    this._formCulture = new FormGroup({
      idChamp: new FormControl(this._culture.champ.id,Validators.required),
      temporaire: new FormControl(this._culture.estTemporaire,Validators.required),
      dateMiseEnCulture: new FormControl(this._culture.dateMiseEnCulture, Validators.required),
      dateDeFin: new FormControl(this._culture.dateDeFin),
      dateDernierEpandage: new FormControl(this._culture.dateEpandage),
      qttFumier: new FormControl(this._culture.qttFumier),
      referenceAnalyse: new FormControl(this._culture.analysePDF),
      grainId: new FormControl(this._culture.typeDeGrainDTO.id, Validators.required),
    })
  }

  //Encapsulation

  get formCulture(): FormGroup {
    return this._formCulture;
  }

  get loading(): boolean {
    return this._loading;
  }

  get champs(): Champ[] {
    return this._champs;
  }

  get grains(): Grain[] {
    return this._grains;
  }
}
