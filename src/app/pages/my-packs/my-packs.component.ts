import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PackService } from 'src/app/services/pack.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Observable } from 'rxjs';
import { TasksService } from 'src/app/services/task.service';

@Component({
  selector: 'app-my-packs',
  templateUrl: './my-packs.component.html',
  styleUrls: ['./my-packs.component.scss']
})

export class MyPacksComponent implements OnInit{
  @Input() client;
  show: boolean = false;
  packs;
  // packs$: Observable<any>;

  isAdmin: boolean;
  timeToTakeOff: any;
  pepito;
  paRestar: any;
  totalPack: any;

  constructor(private packService: PackService, private authorization: AuthorizationService, private taskService: TasksService) {

    this.authorization.userActive.subscribe(data => {
      this.client = data;
      if (this.client == 3) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    })
    
    if (this.client !== 3) {
      debugger
      this.packService.getPackActive(this.client).subscribe(data => { // NO FUNCIONA ¿?¿?
         // this.pepito = (this.timeToTakeOff - data.time); // saco el "tiempo" del pack que activo sea true
          this.pepito = data; // saco el "tiempo" del pack que activo sea true
          
          console.log('soy pepito', this.pepito)
        });   

      this.packService.getPacksByClient(this.client).subscribe(
        result => {
          this.packs = result;
        },
        err => {
          console.log('oh oh err', err);
        }
      );
    } else {
      this.isAdmin = true;
      this.packService.getPacks().subscribe(
        result => {
          this.packs = result;
        },
        err => {
          console.log('oh oh err', err);
        }
      )
    };
    this.authorization.countMinutes.subscribe(data => {
      this.timeToTakeOff = data;
      console.log(this.timeToTakeOff)
    })
  
    this.packService.getPackActive(this.client).subscribe(data => {
      this.totalPack = data;
    })
  
  }
  

  onClick(e) {
    this.show = !this.show
  }

 

  ngOnInit() {
  

    // if (this.client !== 3) {
    //   this.packService.getPacksByClient(this.client).subscribe(
    //     result => {
    //       this.packs = result;
    //     },
    //     err => {
    //       console.log('oh oh err', err);
    //     }
    //   )
    // } else {
    //   this.packService.getPacks().subscribe(
    //     result => {
    //       this.packs = result;
    //     },
    //     err => {
    //       console.log('oh oh err', err);
    //     }
    //   )
    // };
   
  }// Fin onInit

}