import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bovin} from "../models/bovin/bovin";

@Injectable({
  providedIn: 'root'
})
export class BovinService {

  constructor(private readonly _httpClient: HttpClient) { }

  getAll(){
    return this._httpClient.get<Bovin[]>('http://localhost:8080/bovin/all')
  }
  getOne(numeroInscription: string){
    return this._httpClient.get<Bovin>('http://localhost:8080/bovin/'+numeroInscription)
  }
}
