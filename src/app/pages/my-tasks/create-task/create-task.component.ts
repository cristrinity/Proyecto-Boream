import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { TasksService } from 'src/app/services/task.service';


@Component ({
  selector: 'app-create-task',
  templateUrl: 'create-task.component.html',
  styleUrls: ['create-task.component.scss']
})

export class CreateTaskComponent {
  taskInfo: any;


  constructor(private tasksService: TasksService) {}


  onSaveTask(task) {
    if(this.taskInfo) {
      this.tasksService.editTask(this.taskInfo.id, task);
      this.taskInfo = null;
    }else{
      this.tasksService.addTask(task);
    }
  }

}
