import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Fauche} from "../models/champ/fauche";

@Injectable({
  providedIn: 'root'
})
export class FaucheService {

  private readonly  _BASE_URL = this._api_url + "/champ/fauche";

  constructor(private readonly _httpClient: HttpClient, @Inject("API_URL") private _api_url:string) { }


  getAllFaucheAnnee(annee: number){
    return this._httpClient.get<Fauche[]>(`${this._BASE_URL}/allAnnee/`+annee)
  }

  getAllFaucheChamp(nomChamp: string){
    return this._httpClient.get<Fauche[]>(`${this._BASE_URL}/allChamp/`+nomChamp)
  }

  getFauche(id: number){
    return this._httpClient.get<Fauche>(`${this._BASE_URL}/`+id)
  }

  updateFauche(id: number, form: FormGroup){
    return this._httpClient.patch(`${this._BASE_URL}/`+id, form)
  }

  insertFauche(form: FormGroup){
    return this._httpClient.post(`${this._BASE_URL}/add`, form)
  }

  getAllAnnee(){
    return this._httpClient.get<number[]>(`${this._BASE_URL}/allAnnee`)
  }
}
