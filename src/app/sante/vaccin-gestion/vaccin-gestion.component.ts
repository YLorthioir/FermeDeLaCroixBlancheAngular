import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SanteService} from "../../service/sante.service";
import {Vaccin} from "../../models/sante/vaccin";
import {Observable, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-vaccin-gestion',
  templateUrl: './vaccin-gestion.component.html',
  styleUrls: ['./vaccin-gestion.component.scss']
})
export class VaccinGestionComponent implements OnInit, OnDestroy{

  public formInsert: FormGroup;
  public formUpdate: FormGroup;
  public formNom: FormGroup;
  public vaccins$: Observable<Vaccin[]> = new Observable<Vaccin[]>;
  public vaccin!: Vaccin;

  private destroyed$ = new Subject();

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
      this._santeService.insertVaccin(this.formInsert.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Vaccin ajouté")
          this.formInsert.reset();
        })
      ).subscribe({
        next: ()=>{},
        error: (err)=> {
          if(err.error.status === 'BAD_REQUEST')
            alert("Vaccin déjà existant")
        }
      })
  }

  updateVaccin(){
    if(this.formUpdate.valid)
      this._santeService.updateVaccin(this.vaccin.id, this.formUpdate.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Vaccin modifié");
          this.formNom.reset();
          this.formUpdate.reset();
        })
      ).subscribe()
  }

  ngOnInit(): void {
    this.vaccins$ = this._santeService.getAllVaccin()
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
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
