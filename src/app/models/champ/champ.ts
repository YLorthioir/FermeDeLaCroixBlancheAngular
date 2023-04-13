import {Validators} from "@angular/forms";

export interface Champ{
  id: number;
  lieu: string;
  superficie: number;
  dateDerniereChaux: Date;
}

export const ChampForm={
  lieu: ['',Validators.required],
  superficie: ['',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]],
  dateDerniereChaux: [''],
}
