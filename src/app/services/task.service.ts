import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TasksService {


constructor(private httpClient: HttpClient){}

    getTasks() {
    return this.httpClient.get(`${environment.apiUrl}/tasks`).toPromise();
  }

  async deleteTask(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/tasks/${id}`).toPromise();
  }

  async editTask(id: number, body){
    return this.httpClient.put(`${environment.apiUrl}/tasks/${id}`, body ).toPromise();

  }

  async addTask(task) {
    return this.httpClient.post(`${environment.apiUrl}/tasks/`, task ).toPromise();

  }

  async getTaskById(id){
    return this.httpClient.get(`${environment.apiUrl}/tasks/${id}`).toPromise();

  }
}

