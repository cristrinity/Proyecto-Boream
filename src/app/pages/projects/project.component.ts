import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ProjectsService } from '../../services/project.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectsComponent implements OnInit, DoCheck {

  projectInfo;
  projects;
  //Input() client;
  //@Input() datos;
  userActive;
  isAdmin: boolean;
  client;

  constructor(private projectService: ProjectsService, private authorization: AuthorizationService, private router: Router) {

    this.getProjects();

    if (this.client == 3) {
      this.isAdmin = true;

    } else {
      // debugger
      this.isAdmin = false;
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/proyectos') {
        this.getProjects();
      }
    })
    // console.log('soy client', this.client, localStorage.id)
    // console.log('vengo de authorization y soy data', this.client) // OK. Trae id de usuario (0, 1, 2)

  }

  getProjects() {
    this.authorization.userActive.subscribe(data => {
      //debugger
      this.client = data;

      if(this.client >= 0){
        if (this.client !== 3 && this.client !== null) {
          // debugger
        this.projectService.getProjectsByClient(this.client).subscribe(
          result => {
            // debugger
            this.projects = result;
            console.log('holaaaaa', result)
          },
          err => {
            console.log('hay error');
          }
        );
      } else {
        this.projectService.getProjects().subscribe(
          result => {
            this.projects = result;
            console.log('holaaaaa', result)
          },
          err => {
            console.log('hay error');
          }
        );
      }
    }
    });
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.authorization.userActive.subscribe(data => {
      // debugger
      this.client = data;
    });
  }

  ngOnInit() {
    this.authorization.userActive.subscribe(data => {
      // debugger
      this.client = data;
    })

    console.log('tngo algo? soy Useractive', this.userActive)
  }


  async onDelete(project) {
    await this.projectService.deleteProject(project.id);
    //await this.refreshProjects();
  }

  onEdit(evt) {
    this.projectInfo = evt;
  }

}

