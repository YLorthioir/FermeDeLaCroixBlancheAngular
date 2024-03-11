import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Champ} from "../models/champ/champ";
import {FormGroup} from "@angular/forms";
import {Culture} from "../models/champ/culture";

@Injectable({
  providedIn: 'root'
})
export class ChampService {

  private readonly _BASE_URL = this._api_url + "/champ";

  constructor(private readonly _httpClient: HttpClient, @Inject("API_URL") private _api_url:string) { }

  //Champs

  getAll(){
    return this._httpClient.get<Champ[]>(`${this._BASE_URL}/all`)
  }

  getOne(id: number){
    return this._httpClient.get<Champ>(`${this._BASE_URL}/one/`+id)
  }

  insert(form: FormGroup){
    return this._httpClient.post(`${this._BASE_URL}/add`, form)
  }

  update(id: number, form: FormGroup){
    return this._httpClient.patch(`${this._BASE_URL}/update/`+id, form)
  }

  //Culture

  insertNewCulture(form: FormGroup){
    return this._httpClient.post(`${this._BASE_URL}/culture/add`, form)
  }

  getAllCulture(id: number){
    return this._httpClient.get<Culture[]>(`${this._BASE_URL}/culture/all/`+id)
  }

  getOneCulture(id: number){
    return this._httpClient.get<Culture>(`${this._BASE_URL}/culture/one/`+id)
  }

  updateCulture(id: number, form: FormGroup){
    return this._httpClient.patch(`${this._BASE_URL}/culture/update/`+id, form)
  }
}
