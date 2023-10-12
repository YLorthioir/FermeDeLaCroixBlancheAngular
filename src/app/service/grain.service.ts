import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Grain} from "../models/champ/grain";

@Injectable({
  providedIn: 'root'
})
export class GrainService {

  private readonly  _BASE_URL = "http://localhost:8080/champ/grain";

  constructor(private readonly _httpClient: HttpClient) { }

  getAll(){
    return this._httpClient.get<Grain[]>(`${this._BASE_URL}/all`)
  }

  update(id: number, nom: string){
    return this._httpClient.patch(`${this._BASE_URL}/`+id,nom)
  }

  add(nom: string){
    return this._httpClient.post(`${this._BASE_URL}/add`,nom)
  }

  getOne(id:number){
    return this._httpClient.get<Grain>(`${this._BASE_URL}/`+id)
  }
}
