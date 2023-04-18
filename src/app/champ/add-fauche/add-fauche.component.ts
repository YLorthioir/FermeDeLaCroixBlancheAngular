import {Component, OnInit} from '@angular/core';
import {ChampService} from "../../service/champ.service";
import {Champ} from "../../models/champ/champ";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FaucheService} from "../../service/fauche.service";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {inThePast} from "../../validators/TimeValidators";

@Component({
  selector: 'app-add-fauche',
  templateUrl: './add-fauche.component.html',
  styleUrls: ['./add-fauche.component.scss']
})
export class AddFaucheComponent implements OnInit{

  public champs$: Observable<Champ[]> = new Observable<Champ[]>;
  public formInsert!: FormGroup;

  public loading: boolean = false;

  private destroyed$ = new Subject();

  constructor(private readonly champService: ChampService,
              private readonly faucheService: FaucheService) {
    this.formInsert = new FormGroup({
      annee: new FormControl('',[Validators.required,Validators.pattern(/[0-9]+$/)]),
      fauche: new FormControl('',[Validators.required, inThePast()]),
      faucheRendement: new FormControl('', [Validators.required,Validators.pattern(/[0-9]+$/)]),
      champId: new FormControl('')
    })
  }

  ngOnInit(): void {
      this.champs$=this.champService.getAll();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSubmit() {
    if (this.formInsert.valid)
      this.faucheService.insertFauche(this.formInsert.value).pipe(
      takeUntil(this.destroyed$),
      tap(()=>{
        alert("Fauche ajouté")
        this.formInsert.reset();
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
}
