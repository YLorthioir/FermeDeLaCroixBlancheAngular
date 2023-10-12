import {Validators} from "@angular/forms";

export interface RegisterForm {
  login: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const RegisterForm ={
  login: ['',[Validators.minLength(3),Validators.maxLength(30),Validators.required]],
  password: ['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]],
  confirmPassword: ['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]],
  role: ['',[Validators.required]]
};
