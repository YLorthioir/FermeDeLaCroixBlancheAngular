import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vaccination} from "../models/sante/vaccination";
import {A} from "../models/sante/a";
import {Vaccin} from "../models/sante/vaccin";
import {FormGroup} from "@angular/forms";
import {Maladie} from "../models/sante/maladie";
import {Traitement} from "../models/sante/traitement";

@Injectable({
  providedIn: 'root'
})
export class SanteService {

  private readonly  _BASE_URL = "http://localhost:8080/sante";

  constructor(private readonly _httpClient: HttpClient) { }

  //Vaccination

  getCarnetVaccination(id: number){
    return this._httpClient.get<Vaccination[]>(`${this._BASE_URL}/vaccination/`+id)
  }

  getVaccin(nom: string){
    return this._httpClient.get<Vaccin>(`${this._BASE_URL}/vaccin/`+nom)
  }

  getAllVaccin(){
    return this._httpClient.get<Vaccin[]>(`${this._BASE_URL}/vaccin/all`)
  }

  vaccinate(id: number, nom: string){
    return this._httpClient.post(`${this._BASE_URL}/vaccination/`+id, nom)
  }

  insertVaccin(form: FormGroup){
    return this._httpClient.post(`${this._BASE_URL}/vaccin/add`, form)
  }

  updateVaccin(id: number, form: FormGroup){
    return this._httpClient.patch(`${this._BASE_URL}/vaccin/`+id, form)
  }

  //Maladies


  getA(id: number){
    return this._httpClient.get<A[]>(`${this._BASE_URL}/maladie/a/`+id)
  }

  getAllMaladie(){
    return this._httpClient.get<Maladie[]>(`${this._BASE_URL}/maladie/all`)
  }

  getMaladie(id: number){
    return this._httpClient.get<Maladie>(`${this._BASE_URL}/maladie/`+id)
  }

  updateMaladie(id: number, form: FormGroup){
    return this._httpClient.patch(`${this._BASE_URL}/maladie/`+id, form)
  }

  insertMaladie(nom: String){
    return this._httpClient.post(`${this._BASE_URL}/maladie/add`, nom)
  }

  //Traitement

  getAllTraitement(){
    return this._httpClient.get<Traitement[]>(`${this._BASE_URL}/traitement/all`)
  }

  getTraitement(id: number){
    return this._httpClient.get<Traitement>(`${this._BASE_URL}/traitement/`+id)
  }

  updateTraitement(id: number, form: FormGroup){
    return this._httpClient.patch(`${this._BASE_URL}/traitement/`+id, form)
  }

  insertTraitement(form: FormGroup){
    return this._httpClient.post(`${this._BASE_URL}/traitement/add`, form)
  }


}
