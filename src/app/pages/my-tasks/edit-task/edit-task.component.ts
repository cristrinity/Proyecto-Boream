import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { ProjectsService } from '../../../services/project.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { TasksService } from 'src/app/services/task.service';

@Component ({
  selector: 'app-edit-task',
  templateUrl: 'edit-task.component.html',
  styleUrls: ['edit-task.component.scss']
})

export class EditTaskComponent {


@Output() newTasks;
@Input() tasks;

constructor(private taksService: TasksService){}



}
