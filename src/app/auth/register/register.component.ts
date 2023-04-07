import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {RegisterForm} from "../../models/registerForm";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private _form: FormGroup;
  private _roleConnected: string|null = localStorage.getItem('role');
  private _hide = true;
  constructor(private readonly _authService: AuthService,
              private _router: Router,
              builder: FormBuilder){
    this._form = builder.group(RegisterForm);
  }

  onSubmit(){
    if( this._form.valid ){
      this._authService.login(this._form.value).subscribe(() => {
        this._form.reset();
        this._router.navigate(['home'])
      });
    }
  }

  get form(): FormGroup {
    return this._form;
  }

  get roleConnected(): string | null {
    return this._roleConnected;
  }

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }
}
