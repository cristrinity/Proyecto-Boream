import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectsService {
  // projectsArray = [
  //   {
  //   id: 1,
  //   alias: 'Blog WP',
  //   UrlDominio: 'htpp://www.miblog.com',
  //   UrlAdministracion: 'htpp://www.miblog.com/wp-admin',
  //   tareasRealizadas: 2,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   passAdmin: 'F3nfjase$%/53',
  //   webH: 'http://www.hostalia.com',
  //   usuarioH: 'pepitoRodriz',
  //   passH: 'arroba123'
  //  },
  // {
  //   id: 2,
  //   alias: 'Web WP',
  //   UrlDominio: 'htpp://www.miblogyotrascosas.com',
  //   UrlAdministracion: 'htpp://www.miblogyotrascosas.com/wp-admin',
  //   tareasRealizadas: 3,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   webH: 'http://www.arsys.com',
  //   usuarioH: 'clarisaMzetg',
  //   passH: 'asdf2123',
  //   passAdmin: 'fghjfghjhs$%/53'
  // }, {
  //   id: 3,
  //   alias: 'WP Woocommerce',
  //   UrlDominio: 'htpp://www.mitiendaonline.com',
  //   UrlAdministracion: 'htpp://www.mitiendaonline.com/wp-admin',
  //   tareasRealizadas: 9,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   passAdmin: 'F3nfjase$%/53',
  //   webH: 'http://www.nominalia.com',
  //   usuarioH: 'jasdfe333',
  //   passH: 'arff00123'
  // }, {
  //   id: 4,
  //   alias: 'Prestashop',
  //   UrlDominio: 'htpp://www.mitiendaonlinepresta.com',
  //   UrlAdministracion: 'htpp://www.mitiendaonlinepresta.com/admin234cnl',
  //   tareasRealizadas: 2,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   passAdmin: 'F3nfjase$%/53',
  //   webH: 'http://www.hostalia.com',
  //   usuarioH: 'pepitoRodriz',
  //   passH: 'arroba123'
  //  },
  //  {
  //   id: 5,
  //   alias: 'Blog WP',
  //   UrlDominio: 'htpp://www.miblog.com',
  //   UrlAdministracion: 'htpp://www.miblog.com/wp-admin',
  //   tareasRealizadas: 2,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   passAdmin: 'F3nfjase$%/53',
  //   webH: 'http://www.hostalia.com',
  //   usuarioH: 'pepitoRodriz',
  //   passH: 'arroba123'
  //  },
  // {
  //   id: 6,
  //   alias: 'Web WP',
  //   UrlDominio: 'htpp://www.miblogyotrascosas.com',
  //   UrlAdministracion: 'htpp://www.miblogyotrascosas.com/wp-admin',
  //   tareasRealizadas: 3,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   webH: 'http://www.arsys.com',
  //   usuarioH: 'clarisaMzetg',
  //   passH: 'asdf2123',
  //   passAdmin: 'fghjfghjhs$%/53'
  // }, {
  //   id: 7,
  //   alias: 'WP Woocommerce',
  //   UrlDominio: 'htpp://www.mitiendaonline.com',
  //   UrlAdministracion: 'htpp://www.mitiendaonline.com/wp-admin',
  //   tareasRealizadas: 9,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   passAdmin: 'F3nfjase$%/53',
  //   webH: 'http://www.nominalia.com',
  //   usuarioH: 'jasdfe333',
  //   passH: 'arff00123'
  // }, {
  //   id: 8,
  //   alias: 'Prestashop',
  //   UrlDominio: 'htpp://www.mitiendaonlinepresta.com',
  //   UrlAdministracion: 'htpp://www.mitiendaonlinepresta.com/admin234cnl',
  //   tareasRealizadas: 2,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   passAdmin: 'F3nfjase$%/53',
  //   webH: 'http://www.hostalia.com',
  //   usuarioH: 'pepitoRodriz',
  //   passH: 'arroba123'
  //  },{
  //   id: 9,
  //   alias: 'Blog WP',
  //   UrlDominio: 'htpp://www.miblog.com',
  //   UrlAdministracion: 'htpp://www.miblog.com/wp-admin',
  //   tareasRealizadas: 2,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   passAdmin: 'F3nfjase$%/53',
  //   webH: 'http://www.hostalia.com',
  //   usuarioH: 'pepitoRodriz',
  //   passH: 'arroba123'
  //  },
  // {
  //   id: 10,
  //   alias: 'Web WP',
  //   UrlDominio: 'htpp://www.miblogyotrascosas.com',
  //   UrlAdministracion: 'htpp://www.miblogyotrascosas.com/wp-admin',
  //   tareasRealizadas: 3,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   webH: 'http://www.arsys.com',
  //   usuarioH: 'clarisaMzetg',
  //   passH: 'asdf2123',
  //   passAdmin: 'fghjfghjhs$%/53'
  // }, {
  //   id: 11,
  //   alias: 'WP Woocommerce',
  //   UrlDominio: 'htpp://www.mitiendaonline.com',
  //   UrlAdministracion: 'htpp://www.mitiendaonline.com/wp-admin',
  //   tareasRealizadas: 9,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   passAdmin: 'F3nfjase$%/53',
  //   webH: 'http://www.nominalia.com',
  //   usuarioH: 'jasdfe333',
  //   passH: 'arff00123'
  // }, {
  //   id: 12,
  //   alias: 'Prestashop',
  //   UrlDominio: 'htpp://www.mitiendaonlinepresta.com',
  //   UrlAdministracion: 'htpp://www.mitiendaonlinepresta.com/admin234cnl',
  //   tareasRealizadas: 2,
  //   host: '212.234.567',
  //   puerto: 22,
  //   cifrado: 'tls',
  //   usuario: 'blog.com',
  //   pass: 'arroba123',
  //   userAdmin: 'admin',
  //   passAdmin: 'F3nfjase$%/53',
  //   webH: 'http://www.hostalia.com',
  //   usuarioH: 'pepitoRodriz',
  //   passH: 'arroba123'
  //  }
  // ]

// projectsArray;

constructor(private httpClient: HttpClient){}

  // traerProject(){
  //   this.getProjects().then((data) => {
  //     return data;
  //   });
  // }
   async getProjects() {
   // console.log(this.httpClient.get(`${environment.apiUrl}/projects`).toPromise());
    return this.httpClient.get(`${environment.apiUrl}/projects`).toPromise();
  }

    // this.projectsArray = await this.httpClient.get(`${environment.apiUrl}/projects`);
    // return this.projectsArray;

  async deleteProject(id: number) {

    return this.httpClient.delete(`${environment.apiUrl}/projects/${id}`).toPromise();
    //this.projectsArray = this.projectsArray.filter(b => b.id !== id);
  }

  async editProject(id: number, body){
    return this.httpClient.put(`${environment.apiUrl}/projects/${id}`, body ).toPromise();

  //  this.projectsArray = this.projectsArray.map(b => {
  //    if(b.id === id){
  //      return {...b, ...body};
  //    }
  //    return b;
  //  });
  }

  async addProject(project) {
    return this.httpClient.post(`${environment.apiUrl}/projects/`, project ).toPromise();

    // project.id = Date.now();
    // this.projectsArray.push(project);
  }

  async getProjectById(id){
    return this.httpClient.get(`${environment.apiUrl}/projects/${id}`).toPromise();

    //return this.projectsArray.find(elem => elem.id === id);
  }
}

