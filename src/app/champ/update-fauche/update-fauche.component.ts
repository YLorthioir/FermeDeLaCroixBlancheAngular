import {Component, OnInit} from '@angular/core';
import {Champ} from "../../models/champ/champ";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChampService} from "../../service/champ.service";
import {FaucheService} from "../../service/fauche.service";
import {ActivatedRoute} from "@angular/router";
import {Fauche} from "../../models/champ/fauche";
import {Culture} from "../../models/champ/culture";

@Component({
  selector: 'app-update-fauche',
  templateUrl: './update-fauche.component.html',
  styleUrls: ['./update-fauche.component.scss']
})
export class UpdateFaucheComponent implements OnInit{

  private _champs!: Champ[];
  private _cultures!: Culture[]
  private _formUpdate!: FormGroup;
  private _fauche!: Fauche;

  private _loading: boolean = false;

  constructor(private readonly _champService: ChampService,
              private readonly _faucheService: FaucheService,
              private readonly _route: ActivatedRoute) {
    this._formUpdate = new FormGroup({
      annee: new FormControl('',Validators.required),
      cultureId: new FormControl(''),
      fauche1: new FormControl('',Validators.required),
      fauche1Rendement: new FormControl('', [Validators.required, Validators.min(0)]),
      fauche2: new FormControl(''),
      fauche2Rendement: new FormControl('',Validators.min(0)),
      fauche3: new FormControl(''),
      fauche3Rendement: new FormControl('',Validators.min(0)),
      fauche4: new FormControl(''),
      fauche4Rendement: new FormControl('',Validators.min(0)),
    })
  }

  ngOnInit(): void {
    this._champService.getAll().subscribe(
      champs => {
        this._loading=true;
        this._champs=champs;
        this._faucheService.getFauche(this._route.snapshot.params['param']).subscribe(
          fauche => {
            this._fauche = fauche;
            this._champService.getAllCulture(this._fauche.cultureDTO.champ.id).subscribe(
              culture=>{
                this._cultures = culture;
                this.refresh();
                this._loading = false;
              }
            )
          }
        )
      }
    )
  }

  onSubmit(){
    if(this._formUpdate.valid)
      this._faucheService.updateFauche(this._fauche.id,this._formUpdate.value).subscribe()
  }

  refresh(){
    this._formUpdate = new FormGroup({
      annee: new FormControl(this._fauche.annee,Validators.required),
      cultureId: new FormControl(this._fauche.cultureDTO.champ.id),
      fauche1: new FormControl(this._fauche.fauche1,Validators.required),
      fauche1Rendement: new FormControl(this._fauche.fauche1rendement, [Validators.required, Validators.min(0)]),
      fauche2: new FormControl(this._fauche.fauche2),
      fauche2Rendement: new FormControl(this._fauche.fauche2rendement,Validators.min(0)),
      fauche3: new FormControl(this._fauche.fauche3),
      fauche3Rendement: new FormControl(this._fauche.fauche3rendement,Validators.min(0)),
      fauche4: new FormControl(this._fauche.fauche4),
      fauche4Rendement: new FormControl(this._fauche.fauche4rendement,Validators.min(0)),
    })
  }

  // Encapsulation

  get champs(): Champ[] {
    return this._champs;
  }

  get formUpdate(): FormGroup {
    return this._formUpdate;
  }

  get loading(): boolean {
    return this._loading;
  }

  get cultures(): Culture[] {
    return this._cultures;
  }
}
