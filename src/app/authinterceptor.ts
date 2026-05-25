import {  HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Authservice } from './authservice';

@Injectable({providedIn: 'root'})


export class Authinterceptor implements HttpInterceptor{
  constructor( private auth:Authservice){}

  intercept(req: HttpRequest<any>, next:HttpHandler) {
    const token = this.auth.GetToken();
    if(token){
      const closed = req.clone({
        setHeaders: {Authorization: `Bearer${token}`}
      });
    }
    return next.handle(req);
  }
};
