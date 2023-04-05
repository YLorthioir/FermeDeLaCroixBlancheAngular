import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Race} from "../models/bovin/race";

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private readonly _httpClient: HttpClient) { }

  getAllRace(){
    return this._httpClient.get<Race[]>('http://localhost:8080/bovin/race/all')
  }

  update(id: number, nom: string){
    return this._httpClient.patch('http://localhost:8080/bovin/race/'+id,nom)
  }

  add(nom: string){
    return this._httpClient.post('http://localhost:8080/bovin/race/add',nom)
  }

  getOne(id:number){
    return this._httpClient.get<Race>('http://localhost:8080/bovin/race/'+id)
  }
}
