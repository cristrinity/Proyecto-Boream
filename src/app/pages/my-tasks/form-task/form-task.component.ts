import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { TasksService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';


@Component ({
  selector: 'app-form-task',
  templateUrl: 'form-task.component.html',
  styleUrls: ['form-task.component.scss']
})

export class FormTaskComponent implements OnInit, OnChanges{

  myForm;
  taskCopy;

  @Input () taskToEdit;
  @Output() saveTask = new EventEmitter();

constructor(private fb: FormBuilder, private tasksService: TasksService){}

ngOnChanges(changes: SimpleChanges) {
  this.taskCopy = {...changes.taskToEdit.currentValue};
}


ngOnInit(){
  this.myForm = this.fb.group({
    name: [''],
    status: [''],
    tasks: [''],
    time: [''],
    projects: [''],
    description: [''],
    datelimit: ['']
  });


if (this.taskToEdit){

  this.myForm.setValue({
    alias: this.taskToEdit.alias,
    UrlDominio: this.taskToEdit.UrlDominio,
    UrlAdministracion: this.taskToEdit.UrlAdministracion,
    tareasRealizadas: this.taskToEdit.tareasRealizadas,
    host: this.taskToEdit.host,
    puerto: this.taskToEdit.puerto,
    cifrado: this.taskToEdit.cifrado,
    usuario: this.taskToEdit.usuario ? this.taskToEdit.usuario : '',
    pass: this.taskToEdit.pass,
    userAdmin: this.taskToEdit.userAdmin,
    passAdmin: this.taskToEdit.passAdmin,
    webH: this.taskToEdit.webH,
    usuarioH: this.taskToEdit.usuarioH,
    passH: this.taskToEdit.passH
  });
}

}

public submit(e, form){
if (form.valid) {
  if(this.taskToEdit){
    this.tasksService.editTask(this.taskToEdit.id, form.value);
  }else{
    this.tasksService.addTask(form.value);
  }
}
}


}