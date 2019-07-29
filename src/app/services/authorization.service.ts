import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TasksService } from './task.service';

//const AUTH_URL = 'http://localhost:4200/auth/login';
@Injectable()
export class AuthorizationService {
  
  countMinutes = new BehaviorSubject(null);
  userActive = new BehaviorSubject(null);
  observer = new BehaviorSubject<number>(this.getId());
  
  private token: string = null;
  id;
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(name, pass) {

    //return this.httpClient.post(AUTH_URL, {
    return this.httpClient.post(`${environment.apiUrl}/auth/login`, {  
    name,
    pass
    }).toPromise().then((response: any) => {
      if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', this.token)
       this.getUser();
    }
  });
}
getUser() {
  if (!this.getToken()) {
    this.router.navigate(['/login']);
  }
  this.httpClient.get(`${environment.apiUrl}/auth/me`).toPromise().then((data: any) => {
    this.userActive.next(data);
    localStorage.setItem('id', this.userActive.value)
    
    //this.isLoged.next(true);
}); 
}
  logout() {
    this.userActive.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('id');

  }
  getToken(): string {
    return this.token || localStorage.getItem('token');
  }

  getMe(){
    return this.userActive.value;
  }

  getId(): number {
    this.countMinutes.next(null);
    return this.userActive.value
  }

  isLoggedIn() : Observable<number> {
    return this.observer.asObservable();
  }
}
