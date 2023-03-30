import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vaccination} from "../models/sante/vaccination";
import {A} from "../models/sante/a";

@Injectable({
  providedIn: 'root'
})
export class SanteService {

  constructor(private readonly _httpClient: HttpClient) { }

  getCarnetVaccination(id: number){
    return this._httpClient.get<Vaccination[]>('http://localhost:8080/sante/vaccin/'+id)
  }

  getA(id: number){
    return this._httpClient.get<A[]>('http://localhost:8080/sante/maladie/'+id)
  }
}
