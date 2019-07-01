import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProjectsService } from '../../services/project.service';
import { AuthorizationService } from 'src/app/services/authorization.service';


@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectsComponent implements OnInit, OnChanges {

  projectInfo;
  projects;
  @Input() client;
  @Input() datos;
  userActive;
  observer;

  constructor(private projectService: ProjectsService, private authorization: AuthorizationService) {

    this.authorization.observer.subscribe(data => {
      this.client = data;
      console.log('vengo de authorization y soy data', data) // OK. Trae id de usuario (0, 1, 2)
    })

    this.projectService.getProjectsByClient(this.client).subscribe(
      result => {
        this.projects = result;
        console.log('holaaaaa', result)
      },
      err => {
        console.log('hay error');
      }
    );
  }

  ngOnChanges() {
    //this.projects = this.projectService.getProjectsByClient(this.client);
  }

  ngOnInit() {
    this.authorization.observer.subscribe(data => {
      this.client = data;
    })

    //this.refreshProjects();
    this.userActive = this.authorization.getId();
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

