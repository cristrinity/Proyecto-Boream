import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const AUTH_URL = 'http://localhost:4200/auth/login';

@Injectable()
export class AuthorizationService {

  // private misUsers = [{ name: 'Pedro', pass: 'miPass2'}];

  private token: string = null;
  //@Input() id;
  id;
  constructor(private httpClient: HttpClient) { }

  login(user, password) {
    // this.token = `miToken${user}-${pass}`;
    //return Promise.resolve();

    // return this.httpClient.post('http://localhost:300/auth/login'), {
    //   email: user,
    //   password: pass
    //   }).pipe(
    //   tap((response) => {
    //     this.token = response.data.access_token;
    //   })
    // );

    return this.httpClient.post(AUTH_URL, {
      user,
      password
    }).toPromise().then((response: any) => {
      this.token = response.access_token;
      //debugger;
      if (user === 'Koldo') {
        this.id = 0;
      } else if (user === 'Loreto') {
        this.id = 1;
      } else if
        (user === 'Luis') {
        this.id = 2;
      }

      localStorage.token = this.token;
      localStorage.id = this.id;
    });
  }
  logout() {
    this.token = null;
    this.id = null;
  }
  getToken(): string {
    return this.token;
  }
  getId(): number {
    return localStorage.id;
  }
}