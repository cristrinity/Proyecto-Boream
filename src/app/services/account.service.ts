import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {


constructor(private httpClient: HttpClient, private authorization: AuthorizationService) { }

  client = this.authorization.getId();

    getAccountByClient(client: number): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/clients/${this.authorization.getId()}/`);
  }

  async deleteAccount(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/clients/${id}`).toPromise();
  }

  async getAccounts(){
    return this.httpClient.get(`${environment.apiUrl}/clients/`).toPromise();

  }

  async editAccount(id: number, body){
    return this.httpClient.put(`${environment.apiUrl}/clients/${id}`, body ).toPromise();
  }

  async addAccount(account) {
    return this.httpClient.post(`${environment.apiUrl}/clients/`, account ).toPromise();
  }

  async getAccountById(id){
    return this.httpClient.get(`${environment.apiUrl}/clients/${id}`).toPromise();

  }
}

