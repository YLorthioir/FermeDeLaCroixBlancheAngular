import {Fauche} from "../champ/fauche";

export interface VenteFauche{
  id: number;
  quantite: number;
  dateDeVente: Date;
  prixCoutant: number;
  prixRevente: number;
  faucheDTO: Fauche;
}
