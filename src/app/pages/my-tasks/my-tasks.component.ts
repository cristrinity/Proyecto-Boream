import {Component, OnInit, Input} from '@angular/core';
import { TasksService } from 'src/app/services/task.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProjectsService } from 'src/app/services/project.service';
import { PackService } from 'src/app/services/pack.service';

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
  packs;
  packActive;

  constructor(private taskService: TasksService,  private authorization: AuthorizationService, private projectService: ProjectsService, private packService : PackService){

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
      },
      err => {
        console.log('hay error');
      }
    );
}
  ngOnInit() {
    // this.packService.getPacksByClient(this.client).subscribe(
    //   result => {
    //     this.packs = result;
    //     console.log('pack pack', this.packs)
    //     for(let i = 0; i < this.packs.length; i++){
    //       debugger
    //       if(this.packs[i].active === true){
    //         this.packActive = this.packs[i]._id;
    //     }return this.packActive;
    //   }
    // })
    //this.refreshTasks();
    this.authorization.observer.subscribe(data => {
      this.client = data;
    })
    console.log('soy pack activusss', this.packActive)
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
