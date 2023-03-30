import {Bovin} from "../bovin/bovin";
import {Traitement} from "./Traitement";
import {Maladie} from "./maladie";

export interface A {
  anneeMaladie: Date;
  bovinsDTO: Bovin;
  id: number;
  maladieDTO: Maladie;
  traitementDTO: Traitement;
}
