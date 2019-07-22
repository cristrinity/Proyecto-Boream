import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  //Input() client;
  @Input() datos;
  userActive;
  observer;
  isAdmin: boolean;
  client;

  constructor(private projectService: ProjectsService, private authorization: AuthorizationService) {
    
  }
  ngOnChanges(changes: SimpleChanges): void {

      this.authorization.userActive.subscribe(data => {
        this.client = data;
      });

  }

  ngOnInit() {

    this.authorization.userActive.subscribe(data => {
      this.client = data;
    })
      if (this.client == 3) {
        this.isAdmin = true;

      } else {
        this.isAdmin = false;
      }
      console.log('vengo de authorization y soy data', this.client) // OK. Trae id de usuario (0, 1, 2)

    if (this.client !== 3) {
      debugger
      this.projectService.getProjectsByClient(this.client).subscribe(
        result => {
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


  //   this.authorization.userActive.subscribe(data => {
  //   this.client = data;
  // });

//this.refreshProjects();
//this.userActive = this.client;
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

