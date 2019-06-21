import {Component, OnInit} from '@angular/core';
import { ProjectsService } from '../../services/project.service';


@Component ({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectsComponent implements OnInit{

  projectInfo;
  projects;

ngOnInit(){
  this.refreshProjects();
}

refreshProjects(){
  this.projects = this.projectService.getProjects();
}

 constructor(private projectService: ProjectsService) {}


 async onDelete(project) {
  await this.projectService.deleteProject(project.id);
  await this.refreshProjects();
}

onEdit(evt) {
  this.projectInfo = evt;
}


}

