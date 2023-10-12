import {inject, Injectable} from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import {AuthService} from "../service/auth.service";

export const LOGGED_GUARD: CanActivateFn = function () {
  const authService = inject(AuthService);
  const router = inject(Router);

  if( !authService.roleConnected() )
    router.navigateByUrl("/login");

  return authService.roleConnected()!==null;
}


export const ROLE_GUARD: CanActivateFn = function () {

  const authService = inject(AuthService);

  return authService.roleConnected()==="ADMIN"||authService.roleConnected()==="GERANT" ;
}
