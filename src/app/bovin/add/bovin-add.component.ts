import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Bovin, BovinForm} from "../../models/bovin/bovin";
import {Race} from "../../models/bovin/race";
import {BovinService} from "../../service/bovin.service";
import {RaceService} from "../../service/race.service";

@Component({
  selector: 'app-bovin-add',
  templateUrl: './bovin-add.component.html',
  styleUrls: ['./bovin-add.component.scss']
})
export class BovinAddComponent implements OnInit{

  private _form: FormGroup;
  private _races!: Race[];

  constructor(private readonly _bovinService: BovinService,
              private readonly _raceService: RaceService,
              buider: FormBuilder) {
    this._form = buider.group(BovinForm)
  }

  ngOnInit(): void {

    this._raceService.getAllRace().subscribe(
      (races)=>{
        this._races = races
      }
    )
  }

  onSubmit(){
    if(this._form.valid){
      this._bovinService.add(this._form.value).subscribe(
        (response)=>{
          this._form.reset();
        }
      )
    }
  }

  //Encapsulation


  get form(): FormGroup {
    return this._form;
  }

  get races(): Race[] {
    return this._races;
  }
}

