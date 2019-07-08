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

  constructor(private authorization: AuthorizationService) {
    this.userActive = this.authorization.getId();
    console.log('soy del menu', this.userActive)
  }
  
  ngOnInit(){
    this.userActive = this.authorization.getId();

    if(this.userActive == 3){
      this.isAdmin = true;
      console.log('soy valor isAsdmin', this.isAdmin)
    }else{
      this.isAdmin = false;
    }
  }

}
