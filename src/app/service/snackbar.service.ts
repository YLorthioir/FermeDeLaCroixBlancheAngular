import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

const BASE_DURATION = 3000;

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  message(msg: string, duration?: number){
    this._snackBar.open(msg, "dismiss", {
      duration: duration?duration:BASE_DURATION
    })
  }

  warn(msg: string, duration?: number){
    this._snackBar.open(msg,"dismiss",{
      politeness: "assertive",
      panelClass: "snackbar-warn",
      duration: duration?duration:BASE_DURATION
    })
  }

  error(msg: string, duration?: number) {
    this._snackBar.open(msg,"dismiss",{
      politeness: "assertive",
      panelClass: "snackbar-error",
      duration: duration?duration:BASE_DURATION
    })
  }


}
