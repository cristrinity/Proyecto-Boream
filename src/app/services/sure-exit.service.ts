import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { LoginComponent } from '../shared/components/login/login.component';
import { FormTaskComponent } from '../pages/my-tasks/form-task/form-task.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EditTaskComponent } from '../pages/my-tasks/edit-task/edit-task.component';
import { CreateTaskComponent } from '../pages/my-tasks/create-task/create-task.component';
import { CheckFormsService } from './check-forms.service';


@Injectable()
export class SureExit implements CanDeactivate<EditTaskComponent | CreateTaskComponent>{
  constructor(private checkService: CheckFormsService) {}

  canDeactivate(target: EditTaskComponent | CreateTaskComponent){ 
    
    if(this.checkService.checking.value){
      let popup = confirm('Hay cambios sin guardar. ¿Estás seguro que quieres salir');
      // console.log('mensajito popup',popup)
      return popup;
    }
    return true;
  }

}