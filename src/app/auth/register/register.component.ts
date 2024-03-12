import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {RegisterForm} from "../../models/registerForm";
import {Subject, takeUntil, tap} from "rxjs";
import {confirmPasswordValidator} from "../../validators/ConfirmPasswordValidator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  public form: FormGroup;
  public hide = true;

  private destroyed$ = new Subject();

  constructor(private readonly authService: AuthService,
              private router: Router,
              builder: FormBuilder){
    this.form = builder.group(RegisterForm, {validators: confirmPasswordValidator()});
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSubmit(){
    if( this.form.valid ){
      this.authService.login(this.form.value).pipe(
        takeUntil(this.destroyed$),
        tap(() =>  {
          this.router.navigateByUrl('home');
        })
      ).subscribe(  {
        next: ()=>{},
        error: (err)=> {
          if(err.error.status === 'BAD_REQUEST')
            alert(err.error.message)
          else
            alert(err.error.error)
      }
    })
    }
  }
}
