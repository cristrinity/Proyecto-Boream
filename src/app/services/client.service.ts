import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class ClientService {

  constructor(private httpClient: HttpClient, private authorization: AuthorizationService) { }

  async getClients() {
    return this.httpClient.get(`${environment.apiClient}`).toPromise();
    //return this.httpClient.get(`${environment.apiUrl}`).toPromise();
  }

  async getClientById(id) {
    return this.httpClient.get(`${environment.apiClient}/${id}`).toPromise();
  }

  async addClient(account, client) {
    return this.httpClient.post(`${environment.apiUrl}/clients/create-client`, account, client).toPromise();

  }



}