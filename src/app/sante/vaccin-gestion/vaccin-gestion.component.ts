import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SanteService} from "../../service/sante.service";
import {Vaccin} from "../../models/sante/vaccin";

@Component({
  selector: 'app-vaccin-gestion',
  templateUrl: './vaccin-gestion.component.html',
  styleUrls: ['./vaccin-gestion.component.css']
})
export class VaccinGestionComponent implements OnInit{

  formInsert: FormGroup;
  formUpdate: FormGroup;
  formNom: FormGroup;
  vaccins!: Vaccin[];
  vaccin!: Vaccin;

  constructor(private readonly _santeService: SanteService) {
    this.formInsert = new FormGroup({
      nom: new FormControl('',Validators.required),
      nbDose: new FormControl('',[Validators.required, Validators.min(1)]),
      delai: new FormControl('',[Validators.required, Validators.min(1)]),
      dosage: new FormControl('',Validators.required),
    })
    this.formNom = new FormGroup({
      nom: new FormControl,
    })
    this.formUpdate = new FormGroup({
      nom: new FormControl('',Validators.required),
      nbDose: new FormControl('',[Validators.required, Validators.min(1)]),
      delai: new FormControl('',[Validators.required, Validators.min(1)]),
      dosage: new FormControl('',Validators.required),
      actif: new FormControl('',Validators.required),
    })
    this.formNom.get('nom')?.valueChanges.subscribe((nom) => {
      _santeService.getVaccin(nom).subscribe( (vaccin)=>{
        this.vaccin=vaccin;
        this.refresh();
      })
    })
  }

  insertVaccin(){
    if(this.formInsert.valid)
      this._santeService.insertVaccin(this.formInsert.value).subscribe();
  }

  updateVaccin(){
    if(this.formUpdate.valid)
      this._santeService.updateVaccin(this.vaccin.id, this.formUpdate.value).subscribe();
  }

  ngOnInit(): void {
    this._santeService.getAllVaccin().subscribe(value => {
      this.vaccins=value;
    })
  }

  refresh(){
    this.formUpdate = new FormGroup({
      nom: new FormControl(this.vaccin.nom, Validators.required),
      nbDose: new FormControl(this.vaccin.nbDose, [Validators.required, Validators.min(1)]),
      delai: new FormControl(this.vaccin.delai,[Validators.required, Validators.min(1)]),
      dosage: new FormControl(this.vaccin.dosage, Validators.required),
      actif: new FormControl(this.vaccin.actif, Validators.required),
    })
  }

}
