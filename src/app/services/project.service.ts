import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { BehaviorSubject, Observable } from 'rxjs';
//import { Observable } from "rxjs/Rx"


@Injectable()
export class ProjectsService {
  userActive;
  datos;
  stepOne;
  constructor(private httpClient: HttpClient, private authorization: AuthorizationService) { }


  client = this.authorization.getId();
  
  // async getProjectsByClient(client: number) {
  //   console.log('cliente bueno', this.client);
  //   // console.log(this.httpClient.get(`${environment.apiUrl}/projects`).toPromise());
  //   return this.httpClient.get(`${environment.apiUrl}/projects/client/${this.client}`).toPromise()
  //     .then((response: any) => {
  //       this.datos = response;
  //       console.log('hola', this.datos)
  //       return this.datos;
  //     })
  // }
  // pepito = new BehaviorSubject<any>('');


  getProjectsByClient(client: number): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/projects/client/${this.client}`)
  }
  
// //creamos la función del observador
//   actualizarUser(dato){this.pepito.next(dato)}

  async getProjects() {
    console.log('cliente', this.client);

    // console.log(this.httpClient.get(`${environment.apiUrl}/projects`).toPromise());
    return this.httpClient.get(`${environment.apiUrl}/projects/`).toPromise();
  }

  async deleteProject(id: number) {

    return this.httpClient.delete(`${environment.apiUrl}/projects/${id}`).toPromise();
    //this.projectsArray = this.projectsArray.filter(b => b.id !== id);
  }

  async editProject(id: number, body) {
    return this.httpClient.put(`${environment.apiUrl}/projects/${id}`, body).toPromise();

    //  this.projectsArray = this.projectsArray.map(b => {
    //    if(b.id === id){
    //      return {...b, ...body};
    //    }
    //    return b;
    //  });
  }

  async addProject(project) {
    return this.httpClient.post(`${environment.apiUrl}/projects/`, project).toPromise();

  }

  async getProjectById(id) {
    return this.httpClient.get(`${environment.apiUrl}/projects/${id}`).toPromise();

    //return this.projectsArray.find(elem => elem.id === id);
  }
}

