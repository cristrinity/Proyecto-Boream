import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { PackService } from 'src/app/services/pack.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-table-pack',
    templateUrl: 'table-packs.component.html',
    styleUrls: ['table-packs.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})

export class TablePackComponent implements OnChanges, OnInit {

    @Input() packs;
    
    dataSource;
    expandedElement: PackElement | null;
    
    constructor() {
        this.dataSource = new MatTableDataSource(this.packs);
    }
    
    ngOnChanges() {
        if (Array.isArray(this.packs)) {
            this.dataSource = new MatTableDataSource(this.packs);
            this.dataSource.paginator = this.paginator;
        }
    }
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
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
    columnsToDisplay = ['name', 'type', 'lefttime', 'date', 'tasks'];

   // expandedElement: any;
    
}
        export interface PackElement {
            description: string

        }
