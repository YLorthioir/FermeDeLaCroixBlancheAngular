import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Bovin, BovinForm} from "../../models/bovin/bovin";
import {Race} from "../../models/bovin/race";
import {BovinService} from "../../service/bovin.service";
import {RaceService} from "../../service/race.service";

@Component({
  selector: 'app-bovin-add',
  templateUrl: './bovin-add.component.html',
  styleUrls: ['./bovin-add.component.css']
})
export class BovinAddComponent implements OnInit{

  form: FormGroup;
  races!: Race[];

  constructor(private readonly _bovinService: BovinService,
              private readonly _raceService: RaceService,
              buider: FormBuilder) {
    this.form = buider.group(BovinForm)
  }

  ngOnInit(): void {

    this._raceService.getAllRace().subscribe(
      (races)=>{
        this.races = races
      }
    )
  }

  onSubmit(){
    if(this.form.valid){
      this._bovinService.add(this.form.value).subscribe(
        (response)=>{
          this.form.reset();
        }
      )
    }
  }

}

