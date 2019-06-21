import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component ({
  selector: 'app-table-account',
  templateUrl: './table-account.component.html',
  styleUrls: ['./table-account.component.scss']
})

export class TableAccountComponent implements OnInit, OnChanges{

  
    @Input() datos;

    @Output() delete = new EventEmitter();
    @Output() edit = new EventEmitter();
  
    dataSource;
  
    columnsToDisplay = ['name', 'nif', 'email', 'phone', 'address', 'avatar', 'iedit'];
  
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    constructor(private accountService: AccountService) {
    
      this.dataSource = new MatTableDataSource(this.datos);
    }
    ngOnChanges(){
      if(Array.isArray(this.datos)){
        this.dataSource = new MatTableDataSource(this.datos);
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
    
    onDelete(datos) {
      this.delete.emit(datos);
    }
  
    onEdit(evt, datos) {
      this.edit.emit(datos);
    }
  
  }
  
  export interface AccountData {
    
    name: string;
    progress: string;
    color: string;
  }
  