import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ChampService} from "../../service/champ.service";
import {ChampForm} from "../../models/champ/champ";
import {Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-champ-add',
  templateUrl: './champ-add.component.html',
  styleUrls: ['./champ-add.component.scss']
})
export class ChampAddComponent implements OnDestroy{

  public form: FormGroup;

  private destroyed$ = new Subject();

  constructor(private readonly _champService: ChampService,
              buider: FormBuilder) {
    this.form = buider.group(ChampForm)
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSubmit(){
    if(this.form.valid){
      this._champService.insert(this.form.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Champ ajouté")
          this.form.reset();
        })
      ).subscribe({
        next: ()=>{},
        error: (err)=> {
          if(err.error.status === 'BAD_REQUEST')
            alert(err.error.message)
          else
            alert(err.error.error)
        }
      })
    }
  }

}
