import {Component, OnInit} from '@angular/core';
import {ChampService} from "../../service/champ.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Champ} from "../../models/champ/champ";
import {GrainService} from "../../service/grain.service";
import {Grain} from "../../models/champ/grain";

@Component({
  selector: 'app-nouvelle-culture',
  templateUrl: './add-culture.component.html',
  styleUrls: ['./add-culture.component.scss']
})
export class AddCultureComponent implements OnInit{

  private _formCulture: FormGroup;

  private _loading: boolean = false;

  private _champs!: Champ[];
  private _grains!: Grain[];

  constructor(private readonly _champService: ChampService,
              private readonly _grainService: GrainService,
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
            this._grains = grains
            this._loading = false;
          }
        )
      }
    )
  }

  onSubmit(){
    if(this._formCulture.valid)
      this._champService.insertNewCulture(this._formCulture.value).subscribe();
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
