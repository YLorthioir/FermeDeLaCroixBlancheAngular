import {Inject, Injectable} from '@angular/core';
import {Melange} from "../models/bovin/melange";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MelangeService {

  private readonly  _BASE_URL = this._api_url + "/bovin/melange";

  constructor(private readonly _httpClient: HttpClient, @Inject("API_URL") private _api_url:string) { }


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
