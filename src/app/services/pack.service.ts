import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';

@Injectable()
export class PackService {
    user;
    packs;

    constructor(private httpClient: HttpClient, private authorization: AuthorizationService) { 
    
    this.authorization.userActive.subscribe(data => {
        this.user = data;
      });
    }
    getPacks() {
        return this.httpClient.get(`${environment.apiUrl}/packs`);
    }

   getPacksByClient(client: number): Observable<any>{
        return this.httpClient.get(`${environment.apiUrl}/packs/${this.user}`);
    }
    
    // getPacksByActive() {
    //     return this.httpClient.get(`${environment.apiUrl}/packs/status/:active`);
    // }
        

}