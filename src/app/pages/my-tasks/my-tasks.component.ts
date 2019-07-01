import {Component, OnInit} from '@angular/core';
import { TasksService } from 'src/app/services/task.service';

// import { FormBuilder, FormGroup } from '@angular/forms';

@Component ({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})

export class MyTasksComponent implements OnInit{
  
  constructor(private taskService: TasksService){}
  
  tasks;
  taskInfo;
  
  ngOnInit() {
    this.refreshTasks();
  }
  
   refreshTasks() {
    this.tasks = this.taskService.getTasks();
  }
  

  async onDelete(task) {
    await this.taskService.deleteTask(task.id);
    await this.refreshTasks();
  }

  onEdit(evt) {
    this.taskInfo = evt;
  }

}
