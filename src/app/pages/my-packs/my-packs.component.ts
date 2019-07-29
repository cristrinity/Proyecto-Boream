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

export class MyPacksComponent implements OnInit {
  @Input() client;
  show: boolean = false;
  packs;
  // packs$: Observable<any>;

  isAdmin: boolean;
  timeToTakeOff: any;
  timing: number;
  paRestar: any;
  totalPack: number;
  time: any = {}

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
        this.totalPack = data[0].lefttime; // saco el "tiempo" del pack que activo sea true
        if (this.totalPack != null || this.totalPack != undefined) {
          this.timing = this.totalPack - this.timeToTakeOff;
          console.log('timing resta', this.timing)
          data[0].lefttime = this.timing
          //this.time.lefttime = this.timing
          this.packService.updatePack(data[0]._id, data[0]).subscribe(data => {

          });

        }

      });

      this.authorization.countMinutes.subscribe(data => {
        this.timeToTakeOff = data;
        console.log('timetotakeoff', this.timeToTakeOff)
      })
      debugger

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


  }


  onClick(e) {
    this.show = !this.show
  }



  ngOnInit() {

    this.authorization.countMinutes.subscribe(data => {
      this.timeToTakeOff = data;
      console.log('timetotakeoff en oninit', this.timeToTakeOff)
    })
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