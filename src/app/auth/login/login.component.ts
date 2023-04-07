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
  form: FormGroup;
  hide = true;
  constructor(private readonly authService: AuthService, private _router: Router){
    this.form = new FormGroup({
      login: new FormControl('',[Validators.required]),
      password: new FormControl(''),
    })
  }

  connexion(){
    if( this.form.valid){
      localStorage.clear();
      this.authService.login(this.form.value).subscribe({next: (response: any) => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("login", response.login);
          localStorage.setItem("role", response.role.toString());
          this.authService.connected();
          this._router.navigate(['home']);
        },
        error:() =>{
          alert("Login ou mot de passe invalides!");
        }});
    }
  }
}
