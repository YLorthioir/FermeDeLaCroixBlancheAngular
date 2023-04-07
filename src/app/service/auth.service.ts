import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  source= new BehaviorSubject<boolean>(this.isConnected());
  connectedSource = this.source.asObservable();
  roleConnected = new BehaviorSubject<string>(localStorage.getItem("role")!);

  constructor(private readonly _httpClient: HttpClient) {
    this.roleConnected.next(localStorage.getItem("role")!);
  }

  connected(){
    if(!this.source.value){
      this.source.next(true);
      this.roleConnected.next(localStorage.getItem("role")!);
    }
  }

  disconnect() {
    if(this.source.value){
      this.source.next(false)
      localStorage.clear()
      this.roleConnected.next(localStorage.getItem("role")!);
    }

  }

  isConnected() :boolean{
    if(localStorage.length===0)
      return false
    else
      return true
  }

  login(login: FormGroup) {
    return this._httpClient.post('http://localhost:8080/auth/login', login)
  }
  register(registerForm: FormGroup){
    return this._httpClient.post('http://localhost:8080/auth/register',registerForm)
  }

  getCredentials():HttpHeaders{
    if(this.isConnected()){
      return new HttpHeaders()
        .append('Authorization', localStorage.getItem('token')!);

    } else return new HttpHeaders();
  }

  isAuthorized(login: string):boolean{
    return localStorage.getItem('login')===login
  }
}
