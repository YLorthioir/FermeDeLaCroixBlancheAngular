import {Grain} from "./grain";
import {Champ} from "./champ";

export interface Culture{
  id: number;
  estTemporaire: boolean;
  dateMiseEnCulture: Date;
  dateDeFin: Date;
  analysePDF: string;
  dateEpandage: Date;
  qttFumier: number;
  champ: Champ;
  faucheId: number;
  typeDeGrainDTO: Grain;
}
