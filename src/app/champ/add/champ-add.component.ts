import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ChampService} from "../../service/champ.service";
import {ChampForm} from "../../models/champ/champ";

@Component({
  selector: 'app-champ-add',
  templateUrl: './champ-add.component.html',
  styleUrls: ['./champ-add.component.css']
})
export class ChampAddComponent{

  private _form: FormGroup;

  constructor(private readonly _champService: ChampService,
              buider: FormBuilder) {
    this._form = buider.group(ChampForm)
  }

  onSubmit(){
    if(this._form.valid){
      this._champService.insert(this._form.value).subscribe(
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

}
