import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VenteBovin} from "../models/vente/venteBovin";
import {FormGroup} from "@angular/forms";
import {VenteFauche} from "../models/vente/venteFauche";

@Injectable({
  providedIn: 'root'
})
export class VenteService {
  private readonly  _BASE_URL = "http://localhost:8080/vente";

  constructor(private readonly _httpClient: HttpClient) { }

  // Bovin

  getAllVenteBovin(){
    return this._httpClient.get<VenteBovin[]>(`${this._BASE_URL}/bovin/all`)
  }

  updateVenteBovin(id: number, form: FormGroup){
    return this._httpClient.patch(`${this._BASE_URL}/bovin/update/`+id,form)
  }

  addVenteBovin(form: FormGroup){
    return this._httpClient.post(`${this._BASE_URL}/bovin/add`,form)
  }

  getOneVenteBovin(id:number){
    return this._httpClient.get<VenteBovin>(`${this._BASE_URL}/bovin/`+id)
  }

  deleteVenteBovin(id: number){
    return this._httpClient.delete(`${this._BASE_URL}/bovin/`+id)
  }

  // Fauche

  getAllVenteFauche(){
    return this._httpClient.get<VenteFauche[]>(`${this._BASE_URL}/fauche/all`)
  }

  updateVenteFauche(id: number, form: FormGroup){
    return this._httpClient.patch(`${this._BASE_URL}/fauche/update/`+id,form)
  }

  addVenteFauche(form: FormGroup){
    return this._httpClient.post(`${this._BASE_URL}/fauche/add`,form)
  }

  getOneVenteFauche(id:number){
    return this._httpClient.get<VenteFauche>(`${this._BASE_URL}/fauche/`+id)
  }

  deleteVenteFauche(id: number){
    return this._httpClient.delete(`${this._BASE_URL}/fauche/`+id)
  }
}
