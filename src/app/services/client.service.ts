import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class ClientService {

  constructor(private httpClient: HttpClient, private authorization: AuthorizationService) { }

  async getClients() {
    //return this.httpClient.get(`${environment.apiClient}`).toPromise();
    return this.httpClient.get(`${environment.apiUrl}`).toPromise();
  }

  async getById(id) {
    return this.httpClient.get(`${environment.apiUrl}/${id}`).toPromise();
    //return this.httpClient.get(`${environment.apiClient}/${id}`).toPromise();
  }

  async getUsers() {
    return this.httpClient.get(`${environment.apiUrl}/users/`).toPromise();
  }
  
  async addClient(account, client) {
    return this.httpClient.post(`${environment.apiUrl}/clients/create-client`, account, client).toPromise();

  }

  async deleteClient(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/clients/${id}`).toPromise();
  }



}