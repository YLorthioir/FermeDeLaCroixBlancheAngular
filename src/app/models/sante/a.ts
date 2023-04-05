import {Bovin} from "../bovin/bovin";
import {Traitement} from "./traitement";
import {Maladie} from "./maladie";

export interface A {
  anneeMaladie: Date;
  bovinsDTO: Bovin;
  id: number;
  maladieDTO: Maladie;
  traitementDTO: Traitement;
}
