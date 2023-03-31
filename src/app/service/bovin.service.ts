import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bovin} from "../models/bovin/bovin";
import {FemelleReproduction} from "../models/bovin/femelleReproduction";
import {BovinEngraissement} from "../models/bovin/bovinEngraissement";
import {Race} from "../models/bovin/race";
import {Melange} from "../models/bovin/melange";

@Injectable({
  providedIn: 'root'
})
export class BovinService {

  constructor(private readonly _httpClient: HttpClient) { }

  getAll(){
    return this._httpClient.get<Bovin[]>('http://localhost:8080/bovin/all')
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
}
