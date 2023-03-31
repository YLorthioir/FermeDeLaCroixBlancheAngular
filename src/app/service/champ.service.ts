import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Champ} from "../models/champ/champ";

@Injectable({
  providedIn: 'root'
})
export class ChampService {

  constructor(private readonly _httpClient: HttpClient) { }

  getAll(){
    return this._httpClient.get<Champ[]>('http://localhost:8080/champ/all')
  }
}
