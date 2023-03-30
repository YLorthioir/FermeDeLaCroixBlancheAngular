import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vaccination} from "../models/sante/vaccination";
import {Race} from "../models/bovin/race";

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private readonly _httpClient: HttpClient) { }

  getAllRace(){
    return this._httpClient.get<Race[]>('http://localhost:8080/bovin/race/all')
  }
}
