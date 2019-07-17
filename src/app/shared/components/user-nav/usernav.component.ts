import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls:  ['./usernav.component.scss']
})

export class UsernavComponent implements OnInit{

  @Input() userId;
  @Input() userName;
  useractive;
  userActive;
  id;
  isAdmin : boolean;
  isKoldo: boolean;
  isLoreto: boolean;
constructor(private clientService: ClientService, private authorization: AuthorizationService, private router: Router){}

ngOnInit(){
  this.id = this.authorization.getId();
  this.myClients(this.userId);
  
  if(this.id == 3){
    this.isAdmin = true;
  }else{
    this.isAdmin = false;
  }
  if(this.id == 0){
    this.isKoldo = true;
    this.isLoreto = false;
    }else{
    if(this.id == 1){
      this.isLoreto = true;
      this.isKoldo = false;
    }
  }
}

 async myClients(id){
   this.useractive = await this.clientService.getClientById(id);
   if(this.id == 3){
    this.isAdmin = true;
  }else{
    this.isAdmin = false;
  }
   //debugger
}

checkout(){
  this.authorization.logout();
  localStorage.token = '';
  localStorage.id = '';
  this.router.navigate(['/login']);
}

}
