import {Component, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PackService } from 'src/app/services/pack.service';

@Component ({
  selector: 'app-my-packs',
  templateUrl: './my-packs.component.html',
  styleUrls: ['./my-packs.component.scss']
})

export class MyPacksComponent {

show : boolean = false;
packs;

constructor(private packService: PackService) { }

ngOnInit(){
  this.myPack();
}

  onClick(e){
    this.show = !this.show
  }


   myPack() {
    this.packs = this.packService.getPacks();
}

}
