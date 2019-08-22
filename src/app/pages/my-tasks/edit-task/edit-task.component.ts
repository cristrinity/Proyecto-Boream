import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { ProjectsService } from '../../../services/project.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { TasksService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component ({
  selector: 'app-edit-task',
  templateUrl: 'edit-task.component.html',
  styleUrls: ['edit-task.component.scss']
})

export class EditTaskComponent implements OnInit, OnChanges{
taskSelected;
projectsSelected : Array<any> = [{}];
@Output() newTasks;
// @Input() tasks;
clientProj;
timeToSave;

constructor(private taksService: TasksService, 
  private activatedRoute: ActivatedRoute, 
  private taskService: TasksService,
  private projectService: ProjectsService
  ){}

ngOnChanges(){
  this.clientProj = this.taskSelected.client;
}
hasChanges(){
  return true;

} 
ngOnInit() {
  this.activatedRoute.params.subscribe((data) => {
    this.taskService.getTaskById(data.id).then(task => {
      this.taskSelected = task;
      console.log('soy la taskSelected', this.taskSelected)
      this.clientProj = this.taskSelected.client;
      // this.timeToSave = this.taskSelected.timespent;
      console.log('soy timeToSave', this.timeToSave)
    });
  });
  }
}