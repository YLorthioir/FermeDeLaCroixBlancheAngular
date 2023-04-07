import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private _form: FormGroup;
  private _hide = true;
  constructor(private readonly _authService: AuthService, private _router: Router){
    this._form = new FormGroup({
      login: new FormControl('',[Validators.required]),
      password: new FormControl(''),
    })
  }

  connect(){
    this._authService.login( this.form.value ).subscribe();
  }

  //Getters et setter

  get form(): FormGroup {
    return this._form;
  }

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }
}
