import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService {
  userActive;
  datos;
  client;
constructor(private httpClient: HttpClient, private authorization: AuthorizationService){

this.authorization.userActive.subscribe(data => {
  this.client = data;
});
}
  getTaskByClient(client: number): Observable<any>{
    console.log('soy tu cliente', client);
    return this.httpClient.get(`${environment.apiUrl}/tasks/${this.client}/`) 
//    return this.httpClient.get(`${environment.apiUrl}/tasks/${localStorage.id}/`) 
    }

  getTasks() {
    return this.httpClient.get(`${environment.apiUrl}/tasks`);
  }

  async deleteTask(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/tasks/${id}`).toPromise();
  }

 async editTask(id: number, body){
    return this.httpClient.put(`${environment.apiUrl}/tasks/${id}`, body).toPromise();

  }

  async addTask(task, client) {
    return this.httpClient.post(`${environment.apiUrl}/tasks/create-task`, task, client).toPromise();

  }

  async getTaskById(id){
    return this.httpClient.get(`${environment.apiUrl}/tasks/edit/${id}`).toPromise();

  }
}

