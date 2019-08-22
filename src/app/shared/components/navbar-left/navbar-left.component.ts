import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-navbar-left',
  templateUrl: 'navbar-left.component.html',
  styleUrls: ['navbar-left.component.scss']
})


export class NavbarLeftComponent implements OnInit{
  
  @Input() project;
  userActive;
  isAdmin : boolean;
  client;
  constructor(private authorization: AuthorizationService) {
   
    this.authorization.userActive.subscribe(data => {
      this.client = data;
      if (this.client == 3) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    })
  }
  
  ngOnInit(){
    //this.userActive = localStorage.id;

    if(this.userActive == 3){
      this.isAdmin = true;
      console.log('soy valor isAsdmin', this.isAdmin)
    }else{
      this.isAdmin = false;
    }
  }

}
