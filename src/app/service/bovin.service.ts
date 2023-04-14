import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bovin} from "../models/bovin/bovin";
import {BovinEngraissement} from "../models/bovin/bovinEngraissement";
import {FemelleReproduction} from "../models/bovin/femelleReproduction";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class BovinService {

  private readonly  _BASE_URL = "http://localhost:8080/bovin";

  constructor(private readonly _httpClient: HttpClient) { }

  getAllNI(){
    return this._httpClient.get<string[]>(`${this._BASE_URL}/all`)
  }
  getOne(numeroInscription: string){
    return this._httpClient.get<Bovin>(`${this._BASE_URL}/`+numeroInscription)
  }

  add(bovin: Bovin){
    return this._httpClient.post(`${this._BASE_URL}/add`,bovin)
  }

  getInfosReproduction(id: number){
    return this._httpClient.get<FemelleReproduction>(`${this._BASE_URL}/reproduction/`+id)
  }

  getInfosEngraissement(id: number){
    return this._httpClient.get<BovinEngraissement>(`${this._BASE_URL}/engraissement/`+id)
  }

  getEnfants(numeroInscription: string){
    return this._httpClient.get<Bovin[]>(`${this._BASE_URL}/enfants/`+numeroInscription)
  }

  update(id:number, bovin:Bovin){
    return this._httpClient.put(`${this._BASE_URL}`+id, bovin)
  }

  updateType(id: number, form: FormGroup){
    return this._httpClient.put(`${this._BASE_URL}/type/`+id, form)
  }

  getAllTaureaux(){
    return this._httpClient.get<Bovin[]>(`${this._BASE_URL}/taureaux`)
  }

  getAllBovinsEngraissement(){
    return this._httpClient.get<string[]>(`${this._BASE_URL}/bovinEngraissement`)
  }

}
