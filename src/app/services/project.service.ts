import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable()
export class ProjectsService {
  userActive;
  datos;
  stepOne;

  constructor(private httpClient: HttpClient, private authorization: AuthorizationService) { }


  client = this.authorization.getId();// esto es lo que hace que se pinte el ID de cliente, por eso se lo paso en la llamada a la API.
  // Si no, hay que refrescar antes para que aparezcan de nuevo los datos. Esta línea se lee nada más abrir.
  

  getProjectsByClient(client: number): Observable<any>{
    //return this.httpClient.get(`${environment.apiUrl}/projects/client/${this.authorization.getId()}`)
    return this.httpClient.get(`${environment.apiUrl}/projects/${this.authorization.getId()}/`) 
  }

  getProjectsByClientAdmin(client: number): Observable<any>{
    //return this.httpClient.get(`${environment.apiUrl}/projects/client/${this.authorization.getId()}`)
    return this.httpClient.get(`${environment.apiUrl}/projects/${client}/`) 
  }
  
  getProjectsByAlias(alias: String): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/projects/${this.authorization.getId()}/${alias}`) 
  }

  get() {
    // console.log(this.httpClient.get(`${environment.apiUrl}/projects`).toPromise());
    return this.httpClient.get(`${environment.apiUrl}/projects/`);
  }

  async deleteProject(id: number) {

    return this.httpClient.delete(`${environment.apiUrl}/projects/${id}`).toPromise();
    //this.projectsArray = this.projectsArray.filter(b => b.id !== id);
  }

  async editProject(id: number, body) {
    console.log('soy id', id);
    return this.httpClient.put(`${environment.apiUrl}/projects/${id}`, body).toPromise();

    //  this.projectsArray = this.projectsArray.map(b => {
    //    if(b.id === id){
    //      return {...b, ...body};
    //    }
    //    return b;
    //  });
  }

  async addProject(project, client) {
    return this.httpClient.post(`${environment.apiUrl}/projects/create/`, project, client).toPromise();
  }

  async getProjectById(id) {
    return this.httpClient.get(`${environment.apiUrl}/projects/${this.authorization.getId()}/${id}`).toPromise();
    //return this.projectsArray.find(elem => elem.id === id);
  }
}

