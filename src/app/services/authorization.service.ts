import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// const AUTH_URL = 'http://localhost:4200/auth/login';

@Injectable()
export class AuthorizationService {
  
  userActive = new BehaviorSubject(null);
  observer = new BehaviorSubject<number>(this.getId());
  
  private token: string = null;
  id;
  isLoged = new BehaviorSubject(false);
  constructor(private httpClient: HttpClient) { }

  login(name, pass) {

    return this.httpClient.post(`${environment.apiUrl}/auth/login`, {
      name,
      pass
    }).toPromise().then((response: any) => {
      if (response.token) {
      this.token = response.token;
      localStorage.setItem('access_token', this.token)
      this.httpClient.get(`${environment.apiUrl}/auth/me`).toPromise().then((data: any) => {
        this.userActive.next(data)
        this.isLoged.next(true);
        console.log('soy userActive[0].id', this.userActive.value.id);
      //this.userActive.next(response.user);
     // debugger
    
      // if (name === 'Koldo') {
      //   this.id = 0;
      //   console.log('soy Koldo', this.id)
      // } else if (name === 'Loreto') {
      //   this.id = 1;
      //   console.log('soy Loreto', this.id)
      // } else if
      // (name.name === 'Luis') {
      //   this.id = 2;
      //   console.log('soy Luis', this.id)
      // } else if
      // (name.name === 'admin') {
      //   this.id = 3;
      //   console.log('soy admin', this.id)
      // }
      this.observer.next(this.userActive.value.id);
      // localStorage.token = this.token;
      localStorage.id = this.userActive.value.id;
    })
  }
  });
  }


  logout() {
    this.userActive.next(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    this.observer.next(null);
    
  }
  getToken(): string {
    return this.token;
  }
  getMe(){
    return this.userActive;
  }
  getId(): number {
    return localStorage.id;
  }
  
  isLoggedIn() : Observable<number> {
    return this.observer.asObservable();
  }
}

//**** SIN JWT  ***/
// login(user, password) {

//   return this.httpClient.post(AUTH_URL, {
//     user,
//     password
//   }).toPromise().then((response: any) => {
//     this.token = response.access_token;
//     this.userActive.next(response.user);
//    // debugger
//     if (user === 'Koldo') {
//       this.id = 0;
//     } else if (user === 'Loreto') {
//       this.id = 1;
//     } else if
//     (user === 'Luis') {
//       this.id = 2;
//     } else if
//     (user === 'admin') {
//       this.id = 3;
//     }
    
//     this.observer.next(this.id);
//     localStorage.token = this.token;
//     localStorage.id = this.id;
//   });
// }