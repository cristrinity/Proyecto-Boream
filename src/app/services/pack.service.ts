import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';

@Injectable()
export class PackService {

    packs;

    constructor(private httpClient: HttpClient, private authorization: AuthorizationService) { }

    client = this.authorization.getId();

    getPacks() {
        return this.httpClient.get(`${environment.apiUrl}/packs`);
    }

   getPacksByClient(client: number): Observable<any>{
        return this.httpClient.get(`${environment.apiUrl}/packs/${this.authorization.getId()}`);
    }
    
    async getPacksById(id) {
        return this.httpClient.get(`${environment.apiUrl}/packs/${id}`).toPromise();
    }

}