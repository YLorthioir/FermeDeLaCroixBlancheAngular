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

  constructor(private readonly _httpClient: HttpClient) { }

  //Vaccination

  getCarnetVaccination(id: number){
    return this._httpClient.get<Vaccination[]>('http://localhost:8080/sante/vaccination/'+id)
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

  //Maladies


  getA(id: number){
    return this._httpClient.get<A[]>('http://localhost:8080/sante/maladie/a/'+id)
  }

  getAllMaladie(){
    return this._httpClient.get<Maladie[]>('http://localhost:8080/sante/maladie/all')
  }

  getMaladie(id: number){
    return this._httpClient.get<Maladie>('http://localhost:8080/sante/maladie/'+id)
  }

  updateMaladie(id: number, form: FormGroup){
    return this._httpClient.patch('http://localhost:8080/sante/maladie/'+id, form)
  }

  insertMaladie(nom: String){
    return this._httpClient.post('http://localhost:8080/sante/maladie/add', nom)
  }

  //Traitement

  getAllTraitement(){
    return this._httpClient.get<Traitement[]>('http://localhost:8080/sante/traitement/all')
  }

  getTraitement(id: number){
    return this._httpClient.get<Traitement>('http://localhost:8080/sante/traitement/'+id)
  }

  updateTraitement(id: number, form: FormGroup){
    return this._httpClient.patch('http://localhost:8080/sante/traitement/'+id, form)
  }

  insertTraitement(form: FormGroup){
    return this._httpClient.post('http://localhost:8080/sante/traitement/add', form)
  }


}
