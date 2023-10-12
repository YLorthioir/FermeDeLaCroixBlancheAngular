import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChampService} from "../../service/champ.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Champ} from "../../models/champ/champ";
import {GrainService} from "../../service/grain.service";
import {Grain} from "../../models/champ/grain";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {Race} from "../../models/bovin/race";
import {inThePast} from "../../validators/TimeValidators";

@Component({
  selector: 'app-nouvelle-culture',
  templateUrl: './add-culture.component.html',
  styleUrls: ['./add-culture.component.scss']
})
export class AddCultureComponent implements OnInit, OnDestroy{

   public formCulture: FormGroup;

   public loading: boolean = false;

   public champs$: Observable<Champ[]> = new Observable<Champ[]>;
   public grains$: Observable<Grain[]> = new Observable<Grain[]>;

  private destroyed$ = new Subject();

  constructor(private readonly  champService: ChampService,
              private readonly  grainService: GrainService,
              ) {
    this. formCulture = new FormGroup({
      idChamp: new FormControl('',Validators.required),
      temporaire: new FormControl(false,Validators.required),
      dateMiseEnCulture: new FormControl('', [Validators.required, inThePast()]),
      dateDeFin: new FormControl('', inThePast()),
      dateDernierEpandage: new FormControl('', inThePast()),
      qttFumier: new FormControl('',Validators.pattern(/[0-9]+$/)),
      referenceAnalyse: new FormControl(''),
      grainId: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.champs$=this.champService.getAll();
    this.grains$=this.grainService.getAll()
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSubmit(){
    if(this. formCulture.valid)
      this. champService.insertNewCulture(this. formCulture.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Culture ajouté")
          this.formCulture.reset();
        })
      ).subscribe();
  }
}
