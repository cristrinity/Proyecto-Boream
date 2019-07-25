import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PackService } from 'src/app/services/pack.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-packs',
  templateUrl: './my-packs.component.html',
  styleUrls: ['./my-packs.component.scss']
})

export class MyPacksComponent {
  @Input() client;
  show: boolean = false;
  packs;
  // packs$: Observable<any>;

  isAdmin: boolean;

  constructor(private packService: PackService, private authorization: AuthorizationService) {

    this.authorization.userActive.subscribe(data => {
      this.client = data;
      if (this.client == 3) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      console.log('vengo de authorization y soy data', data) // OK. Trae id de usuario (0, 1, 2)
    })
    
    if (this.client !== 3) {
      // this.packs$ = this.packService.getPacksByClient(this.client);
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
  ngOnInit() {
    this.authorization.userActive.subscribe(data => {
      this.client = data;
      console.log('vengo de authorization y soy data', data) // OK. Trae id de usuario (0, 1, 2)
    })
    if (this.client !== 3) {
      this.packService.getPacksByClient(this.client).subscribe(
        result => {
          this.packs = result;
        },
        err => {
          console.log('oh oh err', err);
        }
      )
    } else {
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

}