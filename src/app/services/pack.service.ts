import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';
import { TasksService } from './task.service';

@Injectable()
export class PackService {
    user;
    packs;
    id;
    constructor(private httpClient: HttpClient, private authorization: AuthorizationService, private taskService: TasksService) { 
    
    this.authorization.userActive.subscribe(data => {
        this.user = data;
      });
  
    }
    getPacks() {
        return this.httpClient.get(`${environment.apiUrl}/packs`);
    }

   getPacksByClient(client: number): Observable<any>{
        return this.httpClient.get(`${environment.apiUrl}/packs/${client}`);
    }
    
    getPackActive(id: number){
        return this.httpClient.get(`${environment.apiUrl}/packs/status/${id}`);
    }

    async updatePack(id: number, body){
        return this.httpClient.put(`${environment.apiUrl}/packs/${id}`, body).toPromise();
    }
    // getPacksById(id: number) {
    //     return this.httpClient.get(`${environment.apiUrl}/packs/:id`);
    // }
        

}