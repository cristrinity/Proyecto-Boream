import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TasksService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProjectsService } from 'src/app/services/project.service';


@Component({
  selector: 'app-form-task',
  templateUrl: 'form-task.component.html',
  styleUrls: ['form-task.component.scss']
})

export class FormTaskComponent implements OnInit, OnChanges {

  myForm;
  taskCopy;
  @Input() client;
  @Input() taskToEdit;
  @Output() saveTask = new EventEmitter();
  aliasPro: Array<any> = [{}];

  constructor(private fb: FormBuilder, private tasksService: TasksService, private authorization: AuthorizationService, private projectService: ProjectsService){

    this.authorization.observer.subscribe(data => {
      this.client = data;
      console.log('vengo de authorization y soy data', data) // OK. Trae id de usuario (0, 1, 2)
    });

    this.projectService.getProjectsByClient(this.client).subscribe(
      result => {
        this.aliasPro = result;
        console.log('aliassiis', this.aliasPro[0].alias, this.aliasPro[1].alias)
      },
      err => {
        console.log('hay error');
      }
    );
  }




  ngOnChanges(changes: SimpleChanges) {
    this.taskCopy = { ...changes.taskToEdit.currentValue };
  }


  ngOnInit() {
    this.myForm = this.fb.group({
      client: this.client,
      name: [''],
      status: [''],
      time_spent: [''],
      project: [''],
      description: [''],
      datelimit: ['']
    });


    if (this.taskToEdit) {

      this.myForm.setValue({
        name: this.taskToEdit.name,
        status: this.taskToEdit.status,
        time_spent: this.taskToEdit.time_spent,
        project: this.taskToEdit.project,
        description: this.taskToEdit.description,
        datelimit: this.taskToEdit.datelimit,
        client: this.client,

      });
    }


  }

  public submit(e, form) {
    if (form.valid) {
      if (this.taskToEdit) {
        this.tasksService.editTask(this.taskToEdit.id, form.value);
      } else {
        this.tasksService.addTask(form.value, this.client);
      }
    }
  }


}