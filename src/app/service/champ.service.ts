import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Champ} from "../models/champ/champ";

@Injectable({
  providedIn: 'root'
})
export class ChampService {

  private readonly _BASE_URL = "http://localhost:8080/champ";

  constructor(private readonly _httpClient: HttpClient) { }

  getAll(){
    return this._httpClient.get<Champ[]>(`${this._BASE_URL}/all`)
  }
}
