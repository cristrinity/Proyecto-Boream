import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {


constructor(private httpClient: HttpClient, private authorization: AuthorizationService) { }

  client = localStorage.id;

  getAccountByClient(client: number): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/clients/${localStorage.id}/`);
  }

  async deleteAccount(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/clients/${id}`).toPromise();
  }

   getAccounts(){
    return this.httpClient.get(`${environment.apiUrl}/clients/`);

  }

  async editAccount(id: number, body){
    console.log('soy id', id);
    return this.httpClient.put(`${environment.apiUrl}/clients/${id}`, body).toPromise();
  }

  // async addAccount(account) {
  //   return this.httpClient.post(`${environment.apiUrl}/clients/${this.authorization.getId()}/`, account).toPromise();
  // }

  async addAccount(account) {
    return this.httpClient.post(`${environment.apiUrl}/clients/create`, account).toPromise();
  }

  async getAccountById(id){
    return this.httpClient.get(`${environment.apiUrl}/clients/${localStorage.id}/${id}`).toPromise();

  }
}

