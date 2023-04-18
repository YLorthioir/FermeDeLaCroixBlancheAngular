import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Champ} from "../../models/champ/champ";
import {Grain} from "../../models/champ/grain";
import {ChampService} from "../../service/champ.service";
import {GrainService} from "../../service/grain.service";
import {ActivatedRoute} from "@angular/router";
import {Culture} from "../../models/champ/culture";
import {Observable, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-update-culture',
  templateUrl: './update-culture.component.html',
  styleUrls: ['./update-culture.component.scss']
})
export class UpdateCultureComponent implements OnInit, OnDestroy{

  public formCulture: FormGroup;

  public loading: boolean = false;

  public champs$: Observable<Champ[]> = new Observable<Champ[]>;
  public grains$: Observable<Grain[]> = new Observable<Grain[]>;
  public culture!: Culture;

  private destroyed$ = new Subject();

  constructor(private readonly champService: ChampService,
              private readonly grainService: GrainService,
              private readonly route: ActivatedRoute,
  ) {
    this.formCulture = new FormGroup({
      idChamp: new FormControl('',Validators.required),
      temporaire: new FormControl(false,Validators.required),
      dateMiseEnCulture: new FormControl('', Validators.required),
      dateDeFin: new FormControl(''),
      dateDernierEpandage: new FormControl(''),
      qttFumier: new FormControl('',Validators.pattern(/[0-9]+$/)),
      referenceAnalyse: new FormControl(''),
      grainId: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void  {
    this.champs$=this.champService.getAll();
    this.grains$=this.grainService.getAll();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSubmit(){
    if(this.formCulture.valid)
      this.champService.updateCulture(this.culture.id, this.formCulture.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Culture modifiée")
          this.formCulture.reset();
        })
      ).subscribe()
  }

  getCulture(id: number){
    this.champService.getOneCulture(id).pipe(
      takeUntil(this.destroyed$),
      tap((culture)=>{
        this.culture=culture;
      })
    ).subscribe()
  }

  refresh(){
    this.formCulture = new FormGroup({
      idChamp: new FormControl(this.culture.champ.id,Validators.required),
      temporaire: new FormControl(this.culture.estTemporaire,Validators.required),
      dateMiseEnCulture: new FormControl(this.culture.dateMiseEnCulture, Validators.required),
      dateDeFin: new FormControl(this.culture.dateDeFin),
      dateDernierEpandage: new FormControl(this.culture.dateEpandage),
      qttFumier: new FormControl(this.culture.qttFumier,Validators.pattern(/[0-9]+$/)),
      referenceAnalyse: new FormControl(this.culture.analysePDF),
      grainId: new FormControl(this.culture.typeDeGrainDTO.id, Validators.required),
    })
  }
}
