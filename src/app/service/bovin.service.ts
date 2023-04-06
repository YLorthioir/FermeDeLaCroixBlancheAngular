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

  constructor(private readonly _httpClient: HttpClient) { }

  getAllNI(){
    return this._httpClient.get<string[]>('http://localhost:8080/bovin/all')
  }
  getOne(numeroInscription: string){
    return this._httpClient.get<Bovin>('http://localhost:8080/bovin/'+numeroInscription)
  }

  add(bovin: Bovin){
    return this._httpClient.post('http://localhost:8080/bovin/add',bovin)
  }

  getInfosReproduction(id: number){
    return this._httpClient.get<FemelleReproduction>('http://localhost:8080/bovin/reproduction/'+id)
  }

  getInfosEngraissement(id: number){
    return this._httpClient.get<BovinEngraissement>('http://localhost:8080/bovin/engraissement/'+id)
  }

  getEnfants(numeroInscription: string){
    return this._httpClient.get<Bovin[]>('http://localhost:8080/bovin/enfants/'+numeroInscription)
  }

  update(id:number, bovin:Bovin){
    return this._httpClient.put('http://localhost:8080/bovin/'+id, bovin)
  }

  updateType(id: number, form: FormGroup){
    return this._httpClient.put('http://localhost:8080/bovin/type/'+id, form)
  }
}
