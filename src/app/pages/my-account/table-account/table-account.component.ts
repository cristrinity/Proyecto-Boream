import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import {MatTableDataSource} from '@angular/material/table';

@Component ({
  selector: 'app-table-account',
  templateUrl: './table-account.component.html',
  styleUrls: ['./table-account.component.scss']
})

export class TableAccountComponent implements OnInit, OnChanges{

  
    @Input() data;
    @Input() accounts;
    @Output() delete = new EventEmitter();
    @Output() edit = new EventEmitter();
    dataSource;
  
    columnsToDisplay = ['user', 'contact', 'invoice', 'iedit'];
  
  
    constructor() {
      this.dataSource = new MatTableDataSource(this.accounts);
    }
    ngOnChanges(){
      if(Array.isArray(this.accounts)){
        console.log('soy data baby', this.accounts)
        this.dataSource = new MatTableDataSource(this.accounts);

      }
    }
  
    ngOnInit() {

    }
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
    }
    
    onDelete(data) {
      this.delete.emit(data);
    }
  
    onEdit(evt, data) {
      this.edit.emit(data);
    }
  
  }
  