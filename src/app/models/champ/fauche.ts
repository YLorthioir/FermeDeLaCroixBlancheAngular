import {Culture} from "./culture";

export interface Fauche{
  id: number;
  annee: number;
  fauche1: Date;
  fauche1rendement: number;
  fauche2: Date;
  fauche2rendement: number;
  fauche3: Date;
  fauche3rendement: number;
  fauche4: Date;
  fauche4rendement: number;
  culture: Culture;
}
