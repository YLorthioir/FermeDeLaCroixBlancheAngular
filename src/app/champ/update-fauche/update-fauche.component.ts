import {Component, OnDestroy, OnInit} from '@angular/core';
import {Champ} from "../../models/champ/champ";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChampService} from "../../service/champ.service";
import {FaucheService} from "../../service/fauche.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Fauche} from "../../models/champ/fauche";
import {Culture} from "../../models/champ/culture";
import {Observable, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-update-fauche',
  templateUrl: './update-fauche.component.html',
  styleUrls: ['./update-fauche.component.scss']
})
export class UpdateFaucheComponent implements OnInit, OnDestroy{

  public champs!: Champ[];
  public cultures!: Culture[]
  public formUpdate!: FormGroup;
  public fauche!: Fauche;

  public loading: boolean = false;

  private destroyed$ = new Subject();

  constructor(private readonly champService: ChampService,
              private readonly faucheService: FaucheService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.formUpdate = new FormGroup({
      annee: new FormControl('',[Validators.required, Validators.min(1950)]),
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

    this.champService.getAll().subscribe(
      champs => {
        this.loading=true;
        this.champs=champs;
        this.faucheService.getFauche(this.route.snapshot.params['param']).subscribe(
          fauche => {
            this.fauche = fauche;
            this.champService.getAllCulture(this.fauche.cultureDTO.champ.id).subscribe(
              culture=>{
                this.cultures = culture;
                this.refresh();
                this.loading = false;
              }
            )
          }
        )
      }
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSubmit(){
    if(this.formUpdate.valid)
      this.faucheService.updateFauche(this.fauche.id,this.formUpdate.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Fauche modifiée")
          this.router.navigateByUrl('champ/fauche/all')
        })
      ).subscribe({
        next: ()=>{},
        error: (err)=> {
          if(err.error.status === 'BAD_REQUEST')
            alert("Nombre de fauches maximum déjà atteintes")
          else if(err.error.error === 'Bad Request')
            alert("Formulaire invalide")
        }
      })
  }

  refresh(){
    this.formUpdate = new FormGroup({
      annee: new FormControl(this.fauche.annee,[Validators.required, Validators.min(1950)]),
      cultureId: new FormControl(this.fauche.cultureDTO.champ.id),
      fauche1: new FormControl(this.fauche.fauche1,Validators.required),
      fauche1Rendement: new FormControl(this.fauche.fauche1rendement, [Validators.required, Validators.min(0),Validators.pattern(/[0-9]+$/)]),
      fauche2: new FormControl(this.fauche.fauche2),
      fauche2Rendement: new FormControl(this.fauche.fauche2rendement,[Validators.min(0),Validators.pattern(/[0-9]+$/)]),
      fauche3: new FormControl(this.fauche.fauche3),
      fauche3Rendement: new FormControl(this.fauche.fauche3rendement,[Validators.min(0),Validators.pattern(/[0-9]+$/)]),
      fauche4: new FormControl(this.fauche.fauche4),
      fauche4Rendement: new FormControl(this.fauche.fauche4rendement,[Validators.min(0),Validators.pattern(/[0-9]+$/)]),
    })
  }
}
