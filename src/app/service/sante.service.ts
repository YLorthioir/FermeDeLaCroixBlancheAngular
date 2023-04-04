import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vaccination} from "../models/sante/vaccination";
import {A} from "../models/sante/a";
import {Vaccin} from "../models/sante/vaccin";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SanteService {

  constructor(private readonly _httpClient: HttpClient) { }

  getCarnetVaccination(id: number){
    return this._httpClient.get<Vaccination[]>('http://localhost:8080/sante/vaccination/'+id)
  }

  getA(id: number){
    return this._httpClient.get<A[]>('http://localhost:8080/sante/maladie/'+id)
  }

  getVaccin(nom: string){
    return this._httpClient.get<Vaccin>('http://localhost:8080/sante/vaccin/'+nom)
  }

  getAllVaccin(){
    return this._httpClient.get<Vaccin[]>('http://localhost:8080/sante/vaccin/all')
  }

  vaccinate(id: number, nom: string){
    return this._httpClient.post('http://localhost:8080/sante/vaccination/'+id, nom)
  }

  insertVaccin(form: FormGroup){
    return this._httpClient.post('http://localhost:8080/sante/vaccin/', form)
  }

  updateVaccin(id: number, form: FormGroup){
    return this._httpClient.post('http://localhost:8080/sante/vaccin/'+id, form)
  }
}
