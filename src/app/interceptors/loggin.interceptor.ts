import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
//import { AuthorizationService } from '../services/authorization.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class LogginInterceptor implements HttpInterceptor {

  initialTime: number;
  endTime: number;
  url = '';

  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      console.log('LogginInterceptor request');
      this.initialTime = Date.now();
      this.url = req.url;
      return next.handle(req).pipe(
        tap( (event: any) => {
        if (event.url && event.url === this.url){
          console.log('LogginInterceptor response');
          this.endTime = Date.now();
          const msg = `Tiempo respuesta: ${this.endTime - this.initialTime}ms`;
          console.log(msg);
        }
      })
      );
}
}
