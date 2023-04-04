import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SanteService} from "../../service/sante.service";
import {Vaccin} from "../../models/sante/vaccin";

@Component({
  selector: 'app-vaccin-gestion',
  templateUrl: './vaccin-gestion.component.html',
  styleUrls: ['./vaccin-gestion.component.scss']
})
export class VaccinGestionComponent implements OnInit{

  private _formInsert: FormGroup;
  private _formUpdate: FormGroup;
  private _formNom: FormGroup;
  private _vaccins!: Vaccin[];
  private _vaccin!: Vaccin;

  constructor(private readonly _santeService: SanteService) {
    this._formInsert = new FormGroup({
      nom: new FormControl('',Validators.required),
      nbDose: new FormControl('',[Validators.required, Validators.min(1)]),
      delai: new FormControl('',[Validators.required, Validators.min(1)]),
      dosage: new FormControl('',Validators.required),
    })
    this._formNom = new FormGroup({
      nom: new FormControl,
    })
    this._formUpdate = new FormGroup({
      nom: new FormControl('',Validators.required),
      nbDose: new FormControl('',[Validators.required, Validators.min(1)]),
      delai: new FormControl('',[Validators.required, Validators.min(1)]),
      dosage: new FormControl('',Validators.required),
      actif: new FormControl('',Validators.required),
    })
    this._formNom.get('nom')?.valueChanges.subscribe((nom) => {
      _santeService.getVaccin(nom).subscribe( (vaccin)=>{
        this._vaccin=vaccin;
        this.refresh();
      })
    })
  }

  insertVaccin(){
    if(this._formInsert.valid)
      this._santeService.insertVaccin(this._formInsert.value).subscribe();
  }

  updateVaccin(){
    if(this._formUpdate.valid)
      this._santeService.updateVaccin(this._vaccin.id, this._formUpdate.value).subscribe();
  }

  ngOnInit(): void {
    this._santeService.getAllVaccin().subscribe(value => {
      this._vaccins=value;
    })
  }

  refresh(){
    this._formUpdate = new FormGroup({
      nom: new FormControl(this._vaccin.nom, Validators.required),
      nbDose: new FormControl(this._vaccin.nbDose, [Validators.required, Validators.min(1)]),
      delai: new FormControl(this._vaccin.delai,[Validators.required, Validators.min(1)]),
      dosage: new FormControl(this._vaccin.dosage, Validators.required),
      actif: new FormControl(this._vaccin.actif, Validators.required),
    })
  }

  //Encapsulation

  get vaccins(): Vaccin[] {
    return this._vaccins;
  }

  get formInsert(): FormGroup {
    return this._formInsert;
  }

  get formUpdate(): FormGroup {
    return this._formUpdate;
  }

  get formNom(): FormGroup {
    return this._formNom;
  }
}
