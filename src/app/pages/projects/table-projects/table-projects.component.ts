import {Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges, DoCheck} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectsService } from '../../../services/project.service';
import { ClientService } from 'src/app/services/client.service';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/services/authorization.service';

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

export class MyProjectsComponent implements OnInit, OnChanges, DoCheck{

  isLoggedIn : Observable<boolean>;
  @Input() projects;
  @Input() client;
  @Input() nuevo;
  @Input() datos;

  
  //client;

  constructor(private projectService: ProjectsService, private authorization: AuthorizationService) {
   // this.dataSource = this.projectService.getProjectsByClient(this.client);
  }

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  dataSource;
  
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    //this.id = this.userActive.value;
    this.authorization.userActive.subscribe(data => {
      this.client = data;
    });
    if(Array.isArray(this.projects)){
      console.log(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
        this.dataSource.paginator = this.paginator;
      }
  }


  ngOnChanges(){
   
    if(Array.isArray(this.projects)){

    this.dataSource = new MatTableDataSource(this.projects);
      this.dataSource.paginator = this.paginator;
    }
  }
  
  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.projects);

    console.log('datos?', this.projectService.datos); //aquí está el array con el objeto dentro del usuario
    //console.log(this.projects); // aquí no hay nada
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
