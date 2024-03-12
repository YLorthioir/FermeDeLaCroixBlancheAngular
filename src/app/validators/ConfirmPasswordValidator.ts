import {ValidatorFn, AbstractControl} from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn{
  return (control: AbstractControl) => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword || password.value === confirmPassword.value) {
      return null;
    } else {
      confirmPassword.setErrors({'passwordMismatch': true});
      return {'passwordMismatch': true};
    }
  }
}
