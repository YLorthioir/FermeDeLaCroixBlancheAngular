import {Validators} from "@angular/forms";
import {Race} from "./race";

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
  champ: string;
  injections: any;
  a: any;
  pereNI: string;
  mereNI: string;
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
}

export const BovinForm={
  numeroInscription: ['',[Validators.required]],
  sexe: [],
  dateDeNaissance: [],
  poidsNaissance: [],
  neCesarienne: [],
  raceId: [],
  pereNI: [],
  mereNI: [],
}
