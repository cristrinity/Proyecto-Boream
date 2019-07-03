import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../../../services/project.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html'
})

export class EditProjectComponent implements OnInit{
  projectSelected;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService
  )
  {}


ngOnInit() {
  
  this.activatedRoute.params.subscribe((data) => {
    this.projectsService.getProjectById(data.id).then(project => {
      this.projectSelected = project;
      console.log('soy el proyecto selecccionado', this.projectSelected)
     });
    });
  }
}
