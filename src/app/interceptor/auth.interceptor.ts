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

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      if(localStorage.getItem("role")){
        const authReq = request.clone({
          headers: request.headers.set("Authorization", localStorage.getItem("token")!)
        })

        return next.handle(authReq);
      }


    return next.handle(request);
  }
}
