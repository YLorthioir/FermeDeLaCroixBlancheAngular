import {Bovin} from "../bovin/bovin";
import {Vaccin} from "./vaccin";

export interface Injection{
  id: number;
  dateInjection: Date;
  bovinDTO: Bovin;
  vaccinDTO: Vaccin;
}
