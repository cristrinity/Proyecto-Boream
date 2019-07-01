import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_URL = 'http://localhost:4200/auth/login';

@Injectable()
export class AuthorizationService {
  
  userActive = new BehaviorSubject(null);
  observer = new BehaviorSubject<number>(this.getId());
  
  private token: string = null;
  id;
  
  constructor(private httpClient: HttpClient) { }

  login(user, password) {

    return this.httpClient.post(AUTH_URL, {
      user,
      password
    }).toPromise().then((response: any) => {
      this.token = response.access_token;
      this.userActive.next(response.user);
     // debugger
      if (user === 'Koldo') {
        this.id = 0;
      } else if (user === 'Loreto') {
        this.id = 1;
      } else if
      (user === 'Luis') {
        this.id = 2;
      }
      
      this.observer.next(this.id);
      localStorage.token = this.token;
      localStorage.id = this.id;
    });
  }
  logout() {
    this.token = null;
    this.userActive.next(false);
    localStorage.removeItem('token');
    this.observer.next(null);
    this.id = null;
  }
  getToken(): string {
    return this.token;
  }
  getId(): number {
    return localStorage.id;
  }

  isLoggedIn() : Observable<number> {
    return this.observer.asObservable();
  }
}
