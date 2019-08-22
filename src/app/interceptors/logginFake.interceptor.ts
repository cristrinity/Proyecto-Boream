import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class LogginFakeInterceptor implements HttpInterceptor {

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
      const found = this.misUsers.findIndex(u => u.name === user.user && u.pass === user.password);
      if(found > -1) {
        return of(new HttpResponse(
          { status: 200, body: {access_token: 'LogginFakeInterceptorToken'}}
        ));
      }
      return throwError(new HttpErrorResponse({status: 401}));

     }
      return next.handle(req);
  }
}
