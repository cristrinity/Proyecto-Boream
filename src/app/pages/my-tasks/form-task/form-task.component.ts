import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TasksService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-form-task',
  templateUrl: 'form-task.component.html',
  styleUrls: ['form-task.component.scss']
})

export class FormTaskComponent implements OnInit, OnChanges {

  myForm;
  taskCopy;

  @Input() taskToEdit;
  @Output() saveTask = new EventEmitter();

  constructor(private fb: FormBuilder, private tasksService: TasksService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.taskCopy = { ...changes.taskToEdit.currentValue };
  }


  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''],
      status: [''],
      time_spent: [''],
      projects: [''],
      description: [''],
      date_limit: ['']
    });


    if (this.taskToEdit) {

      this.myForm.setValue({
        name: this.taskToEdit.name,
        status: this.taskToEdit.status,
        time_spent: this.taskToEdit.time_spent,
        projects: this.taskToEdit.projects,
        description: this.taskToEdit.description,
        date_limit: this.taskToEdit.date_limit

      });
    }


  }

  public submit(e, form) {
    if (form.valid) {
      if (this.taskToEdit) {
        this.tasksService.editTask(this.taskToEdit.id, form.value);
      } else {
        this.tasksService.addTask(form.value);
      }
    }
  }


}