import {Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectsService } from '../../../services/project.service';

@Component({
  selector: 'app-table-projects',
  templateUrl: './table-projects.component.html',
  styleUrls: ['./table-projects.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class MyProjectsComponent implements OnInit, OnChanges{


  @Input() projects;
  @Input() nuevo;

  constructor() {
    // Create 100 users
   // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //debugger
    this.dataSource = new MatTableDataSource(this.projects);
    // this.dataSource = this.projects;

  }

ngOnChanges(){
  if(Array.isArray(this.projects)){
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.paginator = this.paginator;
  }
}

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  dataSource;

  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


ngOnInit() {
  this.dataSource.paginator = this.paginator;

   }

  onDelete(projects) {
    this.delete.emit(projects);
  }

  onEdit(evt, projects) {
    this.edit.emit(projects);
  }


  //informacion = this.project.projectsArray;
columnsToDisplay = ['alias', 'UrlDominio', 'UrlAdministracion', 'tareasRealizadas'];

expandedElement: any;

// constructor(private projectsArray:ProjectsService) {}

}

export interface ProjectElement {
  alias: string,
  UrlDominio: string,
  UrlAdministracion: string,
  tareasRealizadas: number,
  host: string,
  puerto: number,
  cifrado: any,
  usuario: any,
  pass: any,
  userAdmin: any,
  passAdmin: any,
  webH: any,
  usuarioH: any,
  passH: any
}

 //const ELEMENT_DATA = this.dataSource;
//   {
//     alias: 'Blog WP',
//     UrlDominio: 'htpp://www.miblog.com',
//     UrlAdministracion: 'htpp://www.miblog.com/wp-admin',
//     tareasRealizadas: 2,
//     host: '212.234.567',
//     puerto: 22,
//     cifrado: 'tls',
//     usuario: 'blog.com',
//     pass: 'arroba123',
//     userAdmin: 'admin',
//     passAdmin: 'F3nfjase$%/53',
//     webH: 'http://www.hostalia.com',
//     usuarioH: 'pepitoRodriz',
//     passH: 'arroba123'
//     },
//   {
//     alias: 'Web WP',
//     UrlDominio: 'htpp://www.miblogyotrascosas.com',
//     UrlAdministracion: 'htpp://www.miblogyotrascosas.com/wp-admin',
//     tareasRealizadas: 3,
//     host: '212.234.567',
//     puerto: 22,
//     cifrado: 'tls',
//     usuario: 'blog.com',
//     pass: 'arroba123',
//     userAdmin: 'admin',
//     webH: 'http://www.arsys.com',
//     usuarioH: 'clarisaMzetg',
//     passH: 'asdf2123',
//     passAdmin: 'fghjfghjhs$%/53'
// }, {
//     alias: 'WP Woocommerce',
//     UrlDominio: 'htpp://www.mitiendaonline.com',
//     UrlAdministracion: 'htpp://www.mitiendaonline.com/wp-admin',
//     tareasRealizadas: 9,
//     host: '212.234.567',
//     puerto: 22,
//     cifrado: 'tls',
//     usuario: 'blog.com',
//     pass: 'arroba123',
//     userAdmin: 'admin',
//     passAdmin: 'F3nfjase$%/53',
//     webH: 'http://www.nominalia.com',
//     usuarioH: 'jasdfe333',
//     passH: 'arff00123'
//    }, {
//     alias: 'Prestashop',
//     UrlDominio: 'htpp://www.mitiendaonlinepresta.com',
//     UrlAdministracion: 'htpp://www.mitiendaonlinepresta.com/admin234cnl',
//     tareasRealizadas: 2,
//     host: '212.234.567',
//     puerto: 22,
//     cifrado: 'tls',
//     usuario: 'blog.com',
//     pass: 'arroba123',
//     userAdmin: 'admin',
//     passAdmin: 'F3nfjase$%/53',
//     webH: 'http://www.hostalia.com',
//     usuarioH: 'pepitoRodriz',
//     passH: 'arroba123'
//     }
// ];
