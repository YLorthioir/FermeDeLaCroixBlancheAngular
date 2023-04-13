import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChampService} from "../../service/champ.service";
import {Champ} from "../../models/champ/champ";

@Component({
  selector: 'app-champ-update',
  templateUrl: './champ-update.component.html',
  styleUrls: ['./champ-update.component.scss']
})
export class ChampUpdateComponent implements OnInit{

  private _formNom: FormGroup;
  private _formUpdate: FormGroup;

  private _loading: boolean = false;

  private _champ!: Champ;
  private _champs!: Champ[];

  constructor(private readonly _champService: ChampService) {
    this._formNom = new FormGroup({
      id: new FormControl,
    })
    this._formUpdate = new FormGroup({
      lieu: new FormControl('',Validators.required),
      superficie: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      annee: new FormControl('',Validators.pattern(/[0-9]+$/)),
    })
    this._formNom.get('id')?.valueChanges.subscribe((id) => {
      _champService.getOne(id).subscribe( (champ)=>{
        this._champ=champ;
        this.refresh();
      })
    })
  }

  ngOnInit(): void {
    this._loading=true;
    this._champService.getAll().subscribe(
      champs =>{
        this._champs = champs;
        this._loading = false;
      }
    )
  }

  refresh(){
    this._formUpdate = new FormGroup({
      lieu: new FormControl(this._champ.lieu,Validators.required),
      superficie: new FormControl(this._champ.superficie,[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      annee: new FormControl(this._champ.dateDerniereChaux),
    })
  }

  update(){
    if(this._formUpdate.valid)
      this._champService.update(this._champ.id, this._formUpdate.value).subscribe()
  }

  //Encapsulation

  get formNom(): FormGroup {
    return this._formNom;
  }

  get formUpdate(): FormGroup {
    return this._formUpdate;
  }

  get champ(): Champ {
    return this._champ;
  }

  get champs(): Champ[] {
    return this._champs;
  }

  get loading(): boolean {
    return this._loading;
  }
}
