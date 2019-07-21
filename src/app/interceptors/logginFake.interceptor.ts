import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class LogginFakeInterceptor implements HttpInterceptor {

  token; 
  constructor(private authorizationService: AuthorizationService){}
  
  private misUsers = [{
    name: 'Koldo', pass: '1234', id: 0
  }, {
    name: 'Loreto', pass: '1234', id: 1
  }, {
    name: 'Luis', pass: '1234', id: 2
  }, {  
    name: 'admin', pass: '1234', id: 3
  }
  ];
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.method === 'POST' && req.url.includes('auth/login')) {
      const user = req.body;
      const found = this.misUsers.findIndex(u => u.name === user.name && u.pass === user.pass);
      if(found > -1) {
        return of(new HttpResponse(
          { status: 200, body: {access_token: this.authorizationService.getToken()}}
        ));
      }
      console.log('fallo por tos lados')
      return throwError(new HttpErrorResponse({status: 401}));
     }
      return next.handle(req);
  }
}
