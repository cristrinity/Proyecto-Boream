import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TasksService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProjectsService } from 'src/app/services/project.service';
import { PackService } from 'src/app/services/pack.service';
import { CheckFormsService } from 'src/app/services/check-forms.service';


@Component({
  selector: 'app-form-task',
  templateUrl: 'form-task.component.html',
  styleUrls: ['form-task.component.scss']
})

export class FormTaskComponent implements OnInit, OnChanges {
   

  myForm;
  taskCopy;
  @Input() projectsSelected;
  @Input() client;
  @Input() taskToEdit;
  @Input() taskSelected;
  @Input() packActive;
  @Output() saveTask = new EventEmitter();
  aliasPro: Array<any> = [{}];
  isAdmin: boolean;
  @Input() isTaskToEdit: boolean;
  packs: any;
  advice;
  projToCalc;
  original;

  constructor(private fb: FormBuilder, private checkService: CheckFormsService, private packService : PackService, private tasksService: TasksService, private authorization: AuthorizationService, private projectService: ProjectsService) {
    
  
    this.authorization.userActive.subscribe(data => {
      this.client = data;
      console.log('vengo de authorization y soy data', data) // OK. Trae id de usuario (0, 1, 2)
      
    if (this.client == 3) {
      this.isAdmin = true;
      this.isTaskToEdit = true;

    } else {
      this.isAdmin = false;
    }
  });

  }
    ngOnChanges(changes: SimpleChanges): void {
      this.original = changes.taskToEdit.currentValue.timespent;
      console.log('soy el original', this.original)
    }

  ngOnInit() {

    this.checkService.checking.next(false);

    if (this.client == 3) {
      this.isAdmin = true;
      console.log('soy valor isAsdmin', this.isAdmin)
      
      this.projectService.getProjectsByClientAdmin(this.projectsSelected).subscribe(
        result => {
          
          this.aliasPro = result;
          console.log('soy aliasPro', this.aliasPro)
        },
        err => {
          console.log('hay error');
        }
      );
      this.packService.getPackActive(this.projectsSelected).subscribe(
        result => {
            this.packs = result;
            debugger
        })
    } else {
      this.isAdmin = false;
      this.projectService.getProjectsByClient(this.client).subscribe(
        result => {
          this.aliasPro = result;
        },
        err => {
          console.log('hay error');
        }
      );
      console.log(this.projectsSelected)
    }

      let modal = document.getElementById("myModal");
      // Get the button that opens the modal
      let btn = document.getElementById("myBtn");
      // Get the <span> element that closes the modal
      //let span = document.getElementsByClassName("close")[0];
      let button = document.getElementById("close");
      // When the user clicks the button, open the modal 
      btn.onclick = function () {
        modal.style.display = "block";
      }
      //When the user clicks on <span> (x), close the modal
      button.onclick = function () {
      modal.style.display = "none";
      }
      // When the user clicks anywhere outside of the modal, close it

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

    //projectsGet();
    

    if (this.client == 3) {
      this.isAdmin = true;
      console.log('soy valor isAsdmin', this.isAdmin)
      console.log(this.projectsSelected)
      this.projectService.getProjectsByClientAdmin(this.projectsSelected).subscribe(
        result => {
          this.aliasPro = result;
          //console.log('aliassiis', this.aliasPro[0].alias, this.aliasPro[1].alias)
        },
        err => {
          console.log('hay error');
        }
      );
    } else {
      this.isAdmin = false;
      this.projectService.getProjectsByClient(this.client).subscribe(
        result => {
          this.aliasPro = result;
          //console.log('aliassiis', this.aliasPro[0].alias, this.aliasPro[1].alias)
        },
        err => {
          console.log('hay error');
        }
      );
    }
  
    if (this.client == 3) {
      this.myForm = this.fb.group({
        // client: this.client,
         client: this.aliasPro[0].client,
         name: [''],
         pack_id: [''],
         status: [''],
         timespent: [''],
         project: [''],
         project_id: [''],
         description: [''],
         datelimit: ['']
       });
    }else{
      this.myForm = this.fb.group({
        client: this.client,
        // client: this.aliasPro[0].client,
         name: [''],
         pack_id: [''],
         status: ['En espera'],
         timespent: [0],
         project: [''],
         project_id: [''],
         description: [''],
         datelimit: ['']
       });

    }


    if (this.taskToEdit) {
      //this.myForm.setValue({
        this.myForm.patchValue({
        name: this.taskToEdit.name,
        status: this.taskToEdit.status,
        timespent: this.taskToEdit.timespent,
        project: this.taskToEdit.project,
        description: this.taskToEdit.description,
        datelimit: this.taskToEdit.datelimit,
        client: this.aliasPro[0].client
        //client: this.client,
      });
    }
  }


  cambio(ca){
    console.log('valor ca',ca)
    if(ca.dirty || !ca.pristine){
      this.checkService.checking.next(true); // seteamos a true el behaviourSubject
      console.log('holaaa has tocado algo', this.checkService.checking.value)
    }
  }
//.subscribe(data => {this.mivariable = data}); 
//esto cambiaría porque está suscrito a lo de arriba, behaviourSubject.

  ejecution(e, resta){
    debugger
    this.packs[0].lefttime = this.packs[0].lefttime - resta
    this.packService.updatePack(this.packs[0]._id, this.packs[0])
  }

  public submit(e, form) {
    if (form.valid) {
      
      if (this.taskToEdit) {
        //debugger
        if(this.original !== form.value.timespent){
          let resta = form.value.timespent - this.original;
          //this.ejecution(form, resta);
          this.packs[0].lefttime = this.packs[0].lefttime - resta
          this.packService.updatePack(this.packs[0]._id, this.packs[0])
          this.tasksService.editTask(this.taskToEdit._id, form.value);
        }else{
          this.tasksService.editTask(this.taskToEdit._id, form.value);
        }
      } else {
        form.value.pack_id = this.packActive;
        //this.packActive.next(this.packActive);
        this.tasksService.addTask(form.value, this.client);
      }
    }
  }
  
}