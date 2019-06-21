import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import {tap} from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private authorization: AuthorizationService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {

    if (!req.url.includes('auth/login')) {
      //esto es la flecha hacia abajo
        const secureReq = req.clone({
         // url: req.url.replace('http://', 'https://')
          headers: req.headers.set('access_token', this.authorization.getToken()? this.authorization.getToken() : localStorage.token)
          // send the cloned, "secure" request to the next handler.
        });
        //console.log('AuthorizationInterceptor request');
        return next.handle(secureReq).pipe(
          //esto es la flecha hacia arriba
          tap( (event: any)  => {
            if (event && event.url){
           // console.log('AuthorizationInterceptor response', event);
          }
          })
      );
    }
    return next.handle(req);
}
}

