import {Component, OnInit, Input} from '@angular/core';
import { TasksService } from 'src/app/services/task.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProjectsService } from 'src/app/services/project.service';

// import { FormBuilder, FormGroup } from '@angular/forms';

@Component ({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})

export class MyTasksComponent implements OnInit{
    
  tasks;
  taskInfo;
  projects;
  @Input() client;
  @Input() datos;
  userActive;
  aliasPro: Array<any> = [];
  observer;
  isAdmin;

  constructor(private taskService: TasksService,  private authorization: AuthorizationService, private projectService: ProjectsService){

    this.authorization.observer.subscribe(data => {
      this.client = data;
      if (this.client == 3) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      console.log('vengo de authorization y soy data', data) // OK. Trae id de usuario (0, 1, 2)
    })
    if (this.client != 3){
      this.taskService.getTaskByClient(this.client).subscribe(
        result => {
          this.tasks = result;
          console.log('holaaaaa task!', result)
        },
        err => {
          console.log('hay error');
        }
      );
    }else{
      this.taskService.getTasks().subscribe(
        result => {
          this.tasks = result;
          console.log('holaaaaa task!', result)
        },
        err => {
          console.log('hay error');
        }
      );
    }
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
  ngOnInit() {
    //this.refreshTasks();
    this.authorization.observer.subscribe(data => {
      this.client = data;
    })

    //this.refreshProjects();
    this.userActive = this.authorization.getId();
  }
  
   refreshTasks() {
    this.tasks = this.taskService.getTasks();
  }
  

  async onDelete(task) {
    await this.taskService.deleteTask(task._id);
    await this.refreshTasks();
  }

  onEdit(evt) {
    this.taskInfo = evt;
  }

}
