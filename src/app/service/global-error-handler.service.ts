import {ErrorHandler, Injectable} from '@angular/core';
import {SnackbarService} from "./snackbar.service";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor(private readonly _snackbar: SnackbarService) { }

  handleError(error: Error): void {
    console.log(error.message)
    this._snackbar.warn(error.message)
  }
}
