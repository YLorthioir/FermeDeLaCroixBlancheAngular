import {AbstractControl, ValidatorFn} from "@angular/forms";

export function inThePast():ValidatorFn{
  return (control: AbstractControl) => {
    const inputTime = new Date(control.value);
    const today = new Date();

    if(inputTime<=today){
      return null;
    }
    return {
      notInThePast : "La date n'est pas dans le passé"
    }
  }
}
