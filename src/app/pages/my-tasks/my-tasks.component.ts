import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  isAdmin;
  packs;
  packActive;
  timeToSave : Array<number> = [];
  @Output() toTakeOff = new EventEmitter();
  toDiscount : number;
  total : number;
  constructor(private taskService: TasksService,  private authorization: AuthorizationService, private projectService: ProjectsService, private packService : PackService){

    this.authorization.userActive.subscribe(data => {
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
          console.log('holaaaaa task clientemío!', result)
          
          // if(this.tasks != null && this.tasks != undefined){
          //   for(let i = 0; i < this.tasks.length; i++){
          //     console.log('time to spent iterando', this.tasks[i].timespent)
          //     this.timeToSave.push(this.tasks[i].timespent);
          //   }
          //   this.toDiscount = 0;
          //   for(let i = 0; i < this.timeToSave.length; i++){
          //     this.toDiscount = this.toDiscount + this.timeToSave[i];
          //     console.log('yo soy la suma', this.toDiscount)
          //   }
          //   this.authorization.countMinutes.next(this.toDiscount);
          //   // this.authorization.countMinutes.value; // Esto saca el valor actual de countMinutes

          //   }
           
        },
        err => {
          console.log('hay error');
        }
      );
    }else{
      this.taskService.getTasks().subscribe(
        result => {
          this.tasks = result;
          console.log('holaaaaa task desde admin!', result)
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
    this.authorization.userActive.subscribe(data => {
      this.client = data;
    });
    console.log('soy pack activusss', this.packActive)
    //this.refreshProjects();
    this.userActive = this.authorization.userActive.subscribe(data => {
      this.userActive = data;
    });

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
