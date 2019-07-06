import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { TasksService } from 'src/app/services/task.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProjectsService } from 'src/app/services/project.service';
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-table-task',
  templateUrl: 'table-task.component.html',
  styleUrls: ['table-task.component.scss'],
  providers: [ DatePipe ]     
})

export class TableTaskComponent implements OnChanges, OnInit {

  @Input() tasks;
  @Input() projects;
  @Input() client;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Input() datos;
  chooseProject;
  dataSource;
alias;
  columnsToDisplay = ['status', 'name', 'time_spent', 'project', 'datelimit'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService: TasksService, private projectService: ProjectsService) {
  
   // this.dataSource = new MatTableDataSource(this.tasks);
  }
  ngOnChanges(){
    if(Array.isArray(this.tasks)){

      this.dataSource = new MatTableDataSource(this.tasks);
      this.dataSource.paginator = this.paginator;
      this.chooseProject = this.projectService.getProjectsByClient(this.client);
      this.alias = this.chooseProject.alias;
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tasks);
    this.chooseProject = this.projectService.getProjectsByClient(this.client);
    this.alias = this.chooseProject.alias;
     
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // console.log('estos son mis projectos desde el otro lado del planeta code', this.chooseProject)
    // console.log('estos son mis projectos desde el otro lado del planeta datos', this.projectService.datos)
    //this.chooseProject = this.projectService.getProjectsByAlias()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  onDelete(tasks) {
    this.delete.emit(tasks);
  }

  onEdit(evt, tasks) {
    this.edit.emit(tasks);
  }

}

