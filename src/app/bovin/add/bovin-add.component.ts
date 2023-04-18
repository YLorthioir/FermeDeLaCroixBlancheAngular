import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Bovin, BovinForm} from "../../models/bovin/bovin";
import {Race} from "../../models/bovin/race";
import {BovinService} from "../../service/bovin.service";
import {RaceService} from "../../service/race.service";
import {Observable, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-bovin-add',
  templateUrl: './bovin-add.component.html',
  styleUrls: ['./bovin-add.component.scss']
})
export class BovinAddComponent implements OnInit, OnDestroy{

  public form: FormGroup;
  public races$: Observable<Race[]> = new Observable<Race[]>;
  public taureaux$: Observable<Bovin[]> = new Observable<Bovin[]>;

  private destroyed$ = new Subject();

  constructor(private readonly bovinService: BovinService,
              private readonly raceService: RaceService,
              buider: FormBuilder) {
    this.form = buider.group(BovinForm)
  }

  ngOnInit(): void {
    this.races$ = this.raceService.getAllRace();
    this.taureaux$ = this.bovinService.getAllTaureaux();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSubmit(){
    if(this.form.valid){
      this.bovinService.add(this.form.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Bovin ajouté")
          this.form.reset();
        })
      ).subscribe({
        next: ()=>{},
        error: (err)=> {
          if(err.error.status === 'BAD_REQUEST')
            alert("Numéro d'identification déjà existant")
          else if(err.error.error === 'Bad Request')
            alert("Formulaire invalide")
        }
      })
    }
  }
}

