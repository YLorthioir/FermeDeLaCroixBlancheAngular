import {Bovin} from "../bovin/bovin";
import {Traitement} from "./traitement";
import {Maladie} from "./maladie";

export interface A {
  id: number;
  anneeMaladie: Date;
  bovin: Bovin;
  maladie: Maladie;
  traitement: Traitement;
}
