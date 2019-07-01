import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { ProjectsService } from '../../services/project.service';
import { AuthorizationService } from 'src/app/services/authorization.service';


@Component ({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectsComponent implements OnInit, OnChanges{

  projectInfo;
  projects;
  @Input() client;
  @Input() datos;
  userActive;

  constructor(private projectService: ProjectsService, private authorization: AuthorizationService) {}

  ngOnChanges(){
    //this.projects = this.projectService.getProjectsByClient(this.client);
  }

ngOnInit(){
  this.client.subscribe(this.authorization.observer);
   this.projectService.getProjectsByClient(this.client).subscribe(
     (result) => {
       this.projects = result.data;
      },
      (err) => {
        console.log('hay error');
      }
   );

  //this.refreshProjects();
  this.userActive = this.authorization.getId();
}



 async onDelete(project) {
  await this.projectService.deleteProject(project.id);
  //await this.refreshProjects();
}

onEdit(evt) {
  this.projectInfo = evt;
}

}

