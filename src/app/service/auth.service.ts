import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";


export interface Auth {
  token: string,
  login: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly  _BASE_URL: string = this._api_url+"/auth";

  constructor(private readonly _httpClient: HttpClient, private _router: Router, @Inject("API_URL") private _api_url:string) {}

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role")
    this._router.navigateByUrl("auth/login")
  }

  login(login: FormGroup): Observable<Auth> {
    return this._httpClient.post<Auth>(`${this._BASE_URL}/login`, login).pipe(
      tap( data => {
        localStorage.setItem("token",data.token);
        localStorage.setItem("username",data.login);
        localStorage.setItem("role",data.role);
        this._router.navigateByUrl("home");
      } )
    )
  }

  removeConnection(){
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
}

  roleConnected() {
    if(localStorage.getItem("role"))
      return localStorage.getItem("role")
    else
      return null
  }
}
