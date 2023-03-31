import { Injectable } from '@angular/core';
import {Melange} from "../models/bovin/melange";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MelangeService {

  constructor(private readonly _httpClient: HttpClient) { }


  getAllMelange(){
    return this._httpClient.get<Melange[]>('http://localhost:8080/bovin/melange/all')
  }
}
