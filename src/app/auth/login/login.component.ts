import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public form: FormGroup;
  public hide = true;
  private destroyed$ = new Subject();

  constructor(
    private readonly _authService: AuthService,
    private _router: Router
  ) {
    _authService.removeConnection();
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl(''),
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  connect() {
    this._authService
      .login(this.form.value)
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => this._router.navigateByUrl('home'))
      )
      .subscribe({
        next: ()=>{},
        error: (err)=> {
          if(err.error.status === 'UNAUTHORIZED')
            alert(err.error.message)
        }
      });
  }
}
