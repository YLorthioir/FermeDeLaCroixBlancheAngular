import {Validators} from "@angular/forms";
import {Race} from "./race";
import {Champ} from "../champ/champ";

export interface Bovin{
  id: number;
  numeroInscription: string;
  sexe: string;
  dateDeNaissance: Date;
  poidsNaissance: number;
  nom: string;
  enCharge: boolean;
  neCesarienne: boolean;
  race: Race;
  champ: Champ;
  injections: any;
  a: any;
  pereNI: string;
  mereNI: string;
  nbCesarienne: number;
  dateAbattage: Date;
  raisonAbattage: string;
}

export interface BovinForm{
  numeroInscription: string;
  sexe: string;
  dateDeNaissance: Date;
  poidsNaissance: number;
  neCesarienne: boolean;
  raceId: number;
  pereNI: string;
  mereNI: string;
  dateAbattage: Date;
  raisonAbattage: string;
}

export const BovinForm={
  numeroInscription: ['BE',[Validators.required, Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]],
  sexe: ['',[Validators.required]],
  dateDeNaissance: ['',[Validators.required]],
  poidsNaissance: ['',[Validators.min(0),Validators.pattern(/[0-9]+$/)]],
  neCesarienne: [false],
  raceId: ['',[Validators.required]],
  pereNI: ['',[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]],
  mereNI: ['',[Validators.minLength(10),Validators.pattern(/^(BE)[0-9]+$/)]],
  dateAbattage: [''],
  raisonAbattage: [''],
}
