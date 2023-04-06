import { Injectable } from '@angular/core';
import {Melange} from "../models/bovin/melange";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MelangeService {

  constructor(private readonly _httpClient: HttpClient) { }


  getAllMelange(){
    return this._httpClient.get<Melange[]>('http://localhost:8080/bovin/melange/all')
  }

  getMelange(id: number){
    return this._httpClient.get<Melange>('http://localhost:8080/bovin/melange/'+id)
  }

  updateMelange(id: number, form: FormGroup){
    return this._httpClient.patch('http://localhost:8080/bovin/melange/'+id, form)
  }

  insertMelange(form: FormGroup){
    return this._httpClient.post('http://localhost:8080/bovin/melange/add', form)
  }
}
