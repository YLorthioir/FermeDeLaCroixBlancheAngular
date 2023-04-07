import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Race} from "../models/bovin/race";

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private readonly  _BASE_URL = "http://localhost:8080/bovin/race";

  constructor(private readonly _httpClient: HttpClient) { }

  getAllRace(){
    return this._httpClient.get<Race[]>(`${this._BASE_URL}/all`)
  }

  update(id: number, nom: string){
    return this._httpClient.patch(`${this._BASE_URL}/`+id,nom)
  }

  add(nom: string){
    return this._httpClient.post(`${this._BASE_URL}/add`,nom)
  }

  getOne(id:number){
    return this._httpClient.get<Race>(`${this._BASE_URL}/`+id)
  }
}
