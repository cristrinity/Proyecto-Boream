import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { TasksService } from 'src/app/services/task.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table-task',
  templateUrl: 'table-task.component.html',
  styleUrls: ['table-task.component.scss']
})

export class TableTaskComponent implements OnChanges, OnInit {

  @Input() tasks;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  dataSource;

  columnsToDisplay = ['status', 'name', 'time', 'project', 'datelimit'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService: TasksService) {
  
    this.dataSource = new MatTableDataSource(this.tasks);
  }
  ngOnChanges(){
    if(Array.isArray(this.tasks)){
      this.dataSource = new MatTableDataSource(this.tasks);
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

export interface TaskData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
