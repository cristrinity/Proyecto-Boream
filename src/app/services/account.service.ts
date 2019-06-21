import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {


constructor(private httpClient: HttpClient){}

   async getAccount() {

    return this.httpClient.get(`${environment.apiUrl}/account`).toPromise();
  }


  async deleteAccount(id: number) {

    return this.httpClient.delete(`${environment.apiUrl}/account/${id}`).toPromise();
  }

  async editAccount(id: number, body){
    return this.httpClient.put(`${environment.apiUrl}/account/${id}`, body ).toPromise();

  }

  async addAccount(account) {
    return this.httpClient.post(`${environment.apiUrl}/account/`, account ).toPromise();

  }

  async getAccountById(id){
    return this.httpClient.get(`${environment.apiUrl}/account/${id}`).toPromise();

  }
}

