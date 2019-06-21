import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  async getClients() {
    return this.httpClient.get(`${environment.apiClient}`).toPromise();
  }

  async getClientById(id) {
    return this.httpClient.get(`${environment.apiClient}/${id}`).toPromise();

  }

}