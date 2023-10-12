import { Injectable } from '@angular/core';
import {Melange} from "../models/bovin/melange";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MelangeService {

  private readonly  _BASE_URL = "http://localhost:8080/bovin/melange";

  constructor(private readonly _httpClient: HttpClient) { }


  getAllMelange(){
    return this._httpClient.get<Melange[]>(`${this._BASE_URL}/all`)
  }

  getMelange(id: number){
    return this._httpClient.get<Melange>(`${this._BASE_URL}/`+id)
  }

  updateMelange(id: number, form: FormGroup){
    return this._httpClient.patch(`${this._BASE_URL}/`+id, form)
  }

  insertMelange(form: FormGroup){
    return this._httpClient.post(`${this._BASE_URL}/add`, form)
  }
}
