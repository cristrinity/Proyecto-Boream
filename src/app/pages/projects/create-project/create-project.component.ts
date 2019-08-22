import { Component, Input } from '@angular/core';
import {ProjectsService} from '../../../services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html'
})

export class CreateProjectComponent {
  projectInfo: any;
  @Input() client;

  constructor(private projectsService: ProjectsService) {}


  onSaveProject(project) {
    if(this.projectInfo) {
      this.projectsService.editProject(this.projectInfo.id, project);
      this.projectInfo = null;
    }else{
      this.projectsService.addProject(project, this.client);
    }
  }

}
