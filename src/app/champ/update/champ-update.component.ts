import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChampService} from "../../service/champ.service";
import {Champ} from "../../models/champ/champ";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {inThePast} from "../../validators/TimeValidators";

@Component({
  selector: 'app-champ-update',
  templateUrl: './champ-update.component.html',
  styleUrls: ['./champ-update.component.scss']
})
export class ChampUpdateComponent implements OnInit, OnDestroy{

  public formNom: FormGroup;
  public formUpdate: FormGroup;

  public loading: boolean = false;

  public champ!: Champ;
  public champs$: Observable<Champ[]> = new Observable<Champ[]>;

  private destroyed$ = new Subject();

  constructor(private readonly champService: ChampService) {
    this.formNom = new FormGroup({
      id: new FormControl,
    })
    this.formUpdate = new FormGroup({
      lieu: new FormControl('',Validators.required),
      superficie: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      dateDerniereChaux: new FormControl('', inThePast()),
    })
    this.formNom.get('id')?.valueChanges.subscribe((id) => {
      champService.getOne(id).subscribe( (champ)=>{
        this.champ=champ;
        this.refresh();
      })
    })
  }

  ngOnInit(): void  {
    this.champs$=this.champService.getAll();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }


  refresh(){
    this.formUpdate = new FormGroup({
      lieu: new FormControl(this.champ.lieu,Validators.required),
      superficie: new FormControl(this.champ.superficie,[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      dateDerniereChaux: new FormControl(this.champ.dateDerniereChaux, inThePast()),
    })
  }

  update(){
    if(this.formUpdate.valid)
      this.champService.update(this.champ.id, this.formUpdate.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Champ modifié")
          this.formUpdate.reset();
        })
      ).subscribe({
        next: ()=>{},
        error: (err)=> {
          if(err.error.status === 'BAD_REQUEST')
            alert("Champ déjà existant")
          else if(err.error.error === 'Bad Request')
            alert("Formulaire invalide")
        }
      })
  }
}
