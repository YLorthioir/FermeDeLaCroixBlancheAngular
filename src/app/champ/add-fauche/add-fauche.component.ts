import {Component, OnInit} from '@angular/core';
import {ChampService} from "../../service/champ.service";
import {Champ} from "../../models/champ/champ";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FaucheService} from "../../service/fauche.service";

@Component({
  selector: 'app-add-fauche',
  templateUrl: './add-fauche.component.html',
  styleUrls: ['./add-fauche.component.scss']
})
export class AddFaucheComponent implements OnInit{

  private _champs!: Champ[];
  private _formInsert!: FormGroup;

  private _loading: boolean = false;

  constructor(private readonly _champService: ChampService,
              private readonly _faucheService: FaucheService) {
    this._formInsert = new FormGroup({
      annee: new FormControl('',[Validators.required,Validators.pattern(/[0-9]+$/)]),
      fauche: new FormControl('',Validators.required),
      faucheRendement: new FormControl('', [Validators.required,Validators.pattern(/[0-9]+$/)]),
      champId: new FormControl('')
    })
  }

  ngOnInit(): void {
    this._champService.getAll().subscribe(
      champs => {
        this._loading=true;
        this._champs=champs;
        this._loading=false;
      }
    )
  }

  onSubmit(){
    if(this._formInsert.valid)
      this._faucheService.insertFauche(this._formInsert.value).subscribe()
  }

  // Encapsulation

  get champs(): Champ[] {
    return this._champs;
  }

  get formInsert(): FormGroup {
    return this._formInsert;
  }

  get loading(): boolean {
    return this._loading;
  }
}
