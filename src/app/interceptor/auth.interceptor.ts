import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly _authService: AuthService) {}

  private isTokenExpired(token: string) {
    const expiration = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiration * 1000 > Date.now();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      if(localStorage.getItem("role")){
        const authReq = request.clone({
          headers: request.headers.set("Authorization", localStorage.getItem("token")!)
        })
        if (!this.isTokenExpired(localStorage.getItem("token")!)) {
          this._authService.logout();
        }

        return next.handle(authReq);
      }


    return next.handle(request);
  }
}
